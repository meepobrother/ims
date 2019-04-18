
import { hasControllerDecorator } from './hasDecorator';
import { methodToProperty } from './methodToProperty'
import ts from 'typescript';
import fs from 'fs-extra'
import { dirname } from 'path';
export function createController(inputFile: string, outputFile: string) {
    const code = fs.readFileSync(inputFile).toString('utf8')
    const sourceFile = ts.createSourceFile('', code, ts.ScriptTarget.ESNext, false, ts.ScriptKind.Unknown)
    const printer = ts.createPrinter();
    let imports = [];
    const visit = (node) => {
        if (ts.isInterfaceDeclaration(node)) {
            // 241;
            return node;
        } else if (ts.isClassDeclaration(node)) {
            if (hasControllerDecorator(node)) {
                const members = [];
                node.members.map(member => {
                    if (ts.isMethodDeclaration(member)) {
                        const property = methodToProperty(member);
                        if (property) {
                            imports = property.imports;
                            members.push(property.property);
                        }
                    }
                });
                return ts.updateClassDeclaration(node, node.decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, members)
            }
        } else if (ts.isExportDeclaration(node)) {
            return node;
        } else {
            // debugger;
        }
    }
    let ress: ts.Node[] = [];
    let name: string;
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
        try {
            const impNode = ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamedImports(['Controller', ...imports].map(imp => ts.createImportSpecifier(undefined, ts.createIdentifier(imp))))), ts.createStringLiteral('ims-core'))
            const parseInc = ts.createImportDeclaration(undefined, undefined, ts.createImportClause(undefined, ts.createNamedImports(['parseInc'].map(imp => ts.createImportSpecifier(undefined, ts.createIdentifier(imp))))), ts.createStringLiteral('ims-adminer'))
            // export default parseInc(name)
            const exp = ts.createCall(ts.createIdentifier('parseInc'), [], [
                ts.createIdentifier(name)
            ]);
            const exportDefault = ts.createExportDefault(exp)
            let impts = [impNode, parseInc, ...ress, exportDefault];
            let des = printer.printList(ts.ListFormat.MultiLine, impts as any, sourceFile);
            fs.ensureDirSync(dirname(outputFile))
            fs.writeFileSync(outputFile, des)
        } catch (e) {
            console.log(e.stack)
        }
        return null;
    });
}