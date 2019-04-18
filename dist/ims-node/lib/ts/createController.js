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
function createController(inputFile, outputFile) {
    const code = fs_extra_1.default.readFileSync(inputFile).toString('utf8');
    const sourceFile = typescript_1.default.createSourceFile('', code, typescript_1.default.ScriptTarget.ESNext, false, typescript_1.default.ScriptKind.Unknown);
    const printer = typescript_1.default.createPrinter();
    let imports = [];
    const visit = (node) => {
        if (typescript_1.default.isInterfaceDeclaration(node)) {
            // 241;
            return node;
        }
        else if (typescript_1.default.isClassDeclaration(node)) {
            if (hasDecorator_1.hasControllerDecorator(node)) {
                const members = [];
                node.members.map(member => {
                    if (typescript_1.default.isMethodDeclaration(member)) {
                        const property = methodToProperty_1.methodToProperty(member);
                        if (property) {
                            imports = property.imports;
                            members.push(property.property);
                        }
                    }
                });
                return typescript_1.default.updateClassDeclaration(node, node.decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, members);
            }
        }
        else if (typescript_1.default.isExportDeclaration(node)) {
            return node;
        }
        else {
            // debugger;
        }
    };
    let ress = [];
    sourceFile.forEachChild(visit, (nodes) => {
        for (let node of nodes) {
            let res = visit(node);
            if (!!res) {
                ress.push(res);
            }
        }
        try {
            const impNode = typescript_1.default.createImportDeclaration(undefined, undefined, typescript_1.default.createImportClause(undefined, typescript_1.default.createNamedImports(['Controller', ...imports].map(imp => typescript_1.default.createImportSpecifier(undefined, typescript_1.default.createIdentifier(imp))))), typescript_1.default.createStringLiteral('ims-core'));
            let impts = [impNode, ...ress];
            let des = printer.printList(typescript_1.default.ListFormat.MultiLine, impts, sourceFile);
            fs_extra_1.default.ensureDirSync(path_1.dirname(outputFile));
            fs_extra_1.default.writeFileSync(outputFile, des);
        }
        catch (e) {
            console.log(e.stack);
        }
        return null;
    });
}
exports.createController = createController;
function template(content) {
    return `
    import { Controller, Get, GetProperty, Post, PostProperty, Put, PutProperty, Delete, DeleteProperty } from 'ims-core';
${content}
`;
}
