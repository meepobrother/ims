"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const typescript_1 = __importDefault(require("typescript"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const filePath = path_1.join(__dirname, 'demo/index.tsx');
const relativePath = path_1.relative(__dirname, filePath);
const root = process.cwd();
const jsxVisitor = (node) => {
    const { openingElement, closingElement, children } = node;
    const { tagName, attributes } = openingElement;
    let html = ``;
    if (typescript_1.default.isIdentifier(tagName)) {
        html += `<${tagName.text}>`;
    }
    children.map(child => {
        html += ``;
    });
    if (typescript_1.default.isIdentifier(closingElement.tagName)) {
        html += `</${closingElement.tagName.text}>`;
    }
    return html;
};
const visitor = (node) => {
    if (typescript_1.default.isClassDeclaration(node)) {
        const members = node.members.map(member => {
            if (typescript_1.default.isMethodDeclaration(member)) {
                if (lib_1.hasMethodDecorator('Render')(member)) {
                    const name = typescript_1.default.createIdentifier('render');
                    return typescript_1.default.updateMethod(member, undefined, member.modifiers, member.asteriskToken, name, member.questionToken, member.typeParameters, member.parameters, member.type, member.body);
                }
            }
            return member;
        });
        const heritageClauses = typescript_1.default.createNodeArray([
            ...node.heritageClauses || [],
            typescript_1.default.createHeritageClause(typescript_1.default.SyntaxKind.ExtendsKeyword, [
                typescript_1.default.createExpressionWithTypeArguments([], typescript_1.default.createPropertyAccess(typescript_1.default.createIdentifier('React'), 'Component'))
            ])
        ]);
        return typescript_1.default.updateClassDeclaration(node, node.decorators, node.modifiers, node.name, node.typeParameters, heritageClauses, lib_1.createNodeArray(members));
    }
};
const tpl = lib_1.createVisitorFromPath(filePath);
const node = tpl(visitor);
const tsDestPath = path_1.join(root, '.temp', relativePath);
fs_extra_1.default.ensureDirSync(path_1.dirname(tsDestPath));
fs_extra_1.default.writeFileSync(tsDestPath, node.code);
debugger;
