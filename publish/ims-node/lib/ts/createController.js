"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hasDecorator_1 = require("./hasDecorator");
const methodToProperty_1 = require("./methodToProperty");
const typescript_1 = __importDefault(require("typescript"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const isDecorator_1 = require("./isDecorator");
function createController(inputFile, outputFile, basePath) {
    const code = fs_extra_1.default.readFileSync(inputFile).toString('utf8');
    const sourceFile = typescript_1.default.createSourceFile('', code, typescript_1.default.ScriptTarget.ESNext, false, typescript_1.default.ScriptKind.Unknown);
    const printer = typescript_1.default.createPrinter();
    let imports = new Set();
    const visit = (node) => {
        if (typescript_1.default.isInterfaceDeclaration(node)) {
            // 241;
            return node;
        }
        if (typescript_1.default.isClassDeclaration(node)) {
            if (hasDecorator_1.hasControllerDecorator(node)) {
                const members = [];
                node.members.map(member => {
                    if (typescript_1.default.isMethodDeclaration(member)) {
                        const property = methodToProperty_1.methodToProperty(member);
                        if (property) {
                            property.imports.map(imp => imports.add(imp));
                            members.push(property.property);
                        }
                    }
                });
                const decorators = node.decorators.map(it => {
                    if (isDecorator_1.isControllerDecorator(it) && basePath !== '/') {
                        const { expression } = it;
                        if (typescript_1.default.isCallExpression(expression)) {
                            const _arguments = expression.arguments.map(arg => {
                                if (typescript_1.default.isObjectLiteralExpression(arg)) {
                                    const properties = arg.properties.map(pro => {
                                        if (typescript_1.default.isPropertyAssignment(pro)) {
                                            const name = pro.name;
                                            if (typescript_1.default.isIdentifier(name)) {
                                                if (name.text === 'path') {
                                                    if (typescript_1.default.isStringLiteral(pro.initializer)) {
                                                        const oldPath = pro.initializer.text;
                                                        const newPath = `${basePath}${oldPath}`;
                                                        const stringLiteral = typescript_1.default.createStringLiteral(newPath);
                                                        return typescript_1.default.updatePropertyAssignment(pro, pro.name, stringLiteral);
                                                    }
                                                }
                                            }
                                        }
                                        return pro;
                                    });
                                    const propertys = typescript_1.default.createNodeArray(properties, arg.properties.hasTrailingComma);
                                    return typescript_1.default.updateObjectLiteral(arg, propertys);
                                }
                                return arg;
                            });
                            const call = typescript_1.default.updateCall(expression, expression.expression, expression.typeArguments, _arguments);
                            return typescript_1.default.updateDecorator(it, call);
                        }
                    }
                    return it;
                });
                return typescript_1.default.updateClassDeclaration(node, decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, members);
            }
        }
        if (typescript_1.default.isExportDeclaration(node)) {
            return node;
        }
    };
    let ress = [];
    let name;
    let impts = [];
    sourceFile.forEachChild(visit, (nodes) => {
        for (let node of nodes) {
            let res = visit(node);
            if (!!res) {
                if (typescript_1.default.isClassDeclaration(res)) {
                    name = res.name.text;
                }
                ress.push(res);
            }
        }
        const impNode = typescript_1.default.createImportDeclaration(undefined, undefined, typescript_1.default.createImportClause(undefined, typescript_1.default.createNamedImports(['Controller', 'HttpResult', ...imports].map(imp => typescript_1.default.createImportSpecifier(undefined, typescript_1.default.createIdentifier(imp))))), typescript_1.default.createStringLiteral('ims-core'));
        const parseInc = typescript_1.default.createImportDeclaration(undefined, undefined, typescript_1.default.createImportClause(undefined, typescript_1.default.createNamedImports(['parseInc'].map(imp => typescript_1.default.createImportSpecifier(undefined, typescript_1.default.createIdentifier(imp))))), typescript_1.default.createStringLiteral('ims-adminer'));
        if (name) {
            const exp = typescript_1.default.createCall(typescript_1.default.createIdentifier('parseInc'), [], [
                typescript_1.default.createIdentifier(name)
            ]);
            const exportDefault = typescript_1.default.createExportDefault(exp);
            impts = [impNode, parseInc, ...ress, exportDefault];
            let des = printer.printList(typescript_1.default.ListFormat.MultiLine, impts, sourceFile);
            fs_extra_1.default.ensureDirSync(path_1.dirname(outputFile));
            fs_extra_1.default.writeFileSync(outputFile, des);
        }
        return null;
    });
}
exports.createController = createController;
