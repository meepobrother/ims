
import { hasControllerDecorator } from './hasDecorator';
import { methodToProperty } from './methodToProperty'
import ts from 'typescript';
import fs from 'fs-extra'
import { dirname } from 'path';
import { isControllerDecorator } from './isDecorator';
export function createController(inputFile: string, outputFile: string, basePath: string) {
    const code = fs.readFileSync(inputFile).toString('utf8')
    const sourceFile = ts.createSourceFile('', code, ts.ScriptTarget.ESNext, false, ts.ScriptKind.Unknown)
    const printer = ts.createPrinter();
    let imports = new Set();
    const visit = (node) => {
        if (ts.isInterfaceDeclaration(node)) {
            // 241;
            return node;
        }
        if (ts.isClassDeclaration(node)) {
            if (hasControllerDecorator(node)) {
                const members = [];
                node.members.map(member => {
                    if (ts.isMethodDeclaration(member)) {
                        const property = methodToProperty(member);
                        if (property) {
                            property.imports.map(imp => imports.add(imp))
                            members.push(property.property);
                        }
                    }
                });
                const decorators = node.decorators.map(it => {
                    if (isControllerDecorator(it) && basePath !== '/') {
                        const { expression } = it;
                        if (ts.isCallExpression(expression)) {
                            const _arguments = expression.arguments.map(arg => {
                                if (ts.isObjectLiteralExpression(arg)) {
                                    const properties = arg.properties.map(pro => {
                                        if (ts.isPropertyAssignment(pro)) {
                                            const name = pro.name;
                                            if (ts.isIdentifier(name)) {
                                                if (name.text === 'path') {
                                                    if (ts.isStringLiteral(pro.initializer)) {
                                                        const oldPath = pro.initializer.text;
                                                        const newPath = `${basePath}${oldPath}`;
                                                        const stringLiteral = ts.createStringLiteral(newPath);
                                                        return ts.updatePropertyAssignment(pro, pro.name, stringLiteral)
                                                    }
                                                }
                                            }
                                        }
                                        return pro;
                                    });
                                    const propertys = ts.createNodeArray(properties, arg.properties.hasTrailingComma);
                                    return ts.updateObjectLiteral(arg, propertys)
                                }
                                return arg;
                            });
                            const call = ts.updateCall(expression, expression.expression, expression.typeArguments, _arguments)
                            return ts.updateDecorator(it, call)
                        }
                    }
                    return it;
                })
                return ts.updateClassDeclaration(node, decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, members)
            }
        }
        if (ts.isExportDeclaration(node)) {
            return node;
        }
    }
    let ress: ts.Node[] = [];
    let name: string;
    let impts: any[] = [];
    sourceFile.forEachChild(visit, (nodes) => {
        for (let node of nodes) {
            let res = visit(node);
            if (!!res) {
                if (ts.isClassDeclaration(res)) {
                    name = res.name.text;
                }
                ress.push(res);
            }
        }
        const impNode = ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamedImports(['Controller', 'HttpResult', ...imports].map(imp => ts.createImportSpecifier(undefined, ts.createIdentifier(imp))))), ts.createStringLiteral('ims-core'))
        const parseInc = ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamedImports(['parseInc'].map(imp => ts.createImportSpecifier(undefined, ts.createIdentifier(imp))))), ts.createStringLiteral('ims-adminer'))
        if (name) {
            const exp = ts.createCall(ts.createIdentifier('parseInc'), [], [
                ts.createIdentifier(name)
            ]);
            const exportDefault = ts.createExportDefault(exp)
            impts = [impNode, parseInc, ...ress, exportDefault];
            let des = printer.printList(ts.ListFormat.MultiLine, impts as any, sourceFile);
            fs.ensureDirSync(dirname(outputFile))
            fs.writeFileSync(outputFile, des);
        }
        return null;
    });
}
