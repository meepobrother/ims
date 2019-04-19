import { createVisitorFromPath, hasMethodDecorator, createNodeArray, getChildNode, NodeFilter } from '../../lib';
import ts from 'typescript';
import fs from 'fs-extra';
import { join, relative, dirname } from 'path';
const filePath = join(__dirname, 'demo/index.tsx');
const relativePath = relative(__dirname, filePath)
const root = process.cwd();
const jsxVisitor = (node: ts.JsxElement) => {
    const { openingElement, closingElement, children } = node;
    const { tagName, attributes } = openingElement;
    let html = ``;
    if (ts.isIdentifier(tagName)) {
        html += `<${tagName.text}>`
    }
    children.map(child => {
        html += ``;
    });
    if (ts.isIdentifier(closingElement.tagName)) {
        html += `</${closingElement.tagName.text}>`
    }
    return html;
}
const visitor = (node: ts.Node) => {
    if (ts.isClassDeclaration(node)) {
        const members = node.members.map(member => {
            if (ts.isMethodDeclaration(member)) {
                if (hasMethodDecorator('Render')(member)) {
                    const name = ts.createIdentifier('render')
                    return ts.updateMethod(member, undefined, member.modifiers, member.asteriskToken, name, member.questionToken, member.typeParameters, member.parameters, member.type, member.body)
                }
            }
            return member;
        });
        const heritageClauses = ts.createNodeArray([
            ...node.heritageClauses || [],
            ts.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                ts.createExpressionWithTypeArguments([], ts.createPropertyAccess(
                    ts.createIdentifier('React'),
                    'Component'
                ))
            ])
        ]);
        return ts.updateClassDeclaration(
            node,
            node.decorators,
            node.modifiers,
            node.name,
            node.typeParameters,
            heritageClauses,
            createNodeArray(members)
        )
    }
}

const tpl = createVisitorFromPath(filePath)
const node = tpl(visitor);
const tsDestPath = join(root, '.temp', relativePath);
fs.ensureDirSync(dirname(tsDestPath))
fs.writeFileSync(tsDestPath, node.code);
debugger;