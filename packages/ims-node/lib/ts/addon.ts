import fs from 'fs-extra';
import ts from 'typescript';
import { hasAddonDecorator } from "./hasDecorator";
import { isAddonDecorator } from './isDecorator';
export function getAddonPath(root: string) {
    const code = fs.readFileSync(root).toString('utf8');
    const sourceFile = ts.createSourceFile('', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.Unknown);
    let path = '';
    const visitor = (node) => {
        if (ts.isClassDeclaration(node)) {
            if (hasAddonDecorator(node)) {
                const addon = node.decorators.find(de => isAddonDecorator(de));
                const { expression } = addon;
                if (ts.isCallExpression(expression)) {
                    const _arguments = expression.arguments;
                    _arguments.map(argument => {
                        if (ts.isObjectLiteralExpression(argument)) {
                            argument.properties.map(it => {
                                if (ts.isPropertyAssignment(it)) {
                                    const name = it.name;
                                    if (ts.isIdentifier(name)) {
                                        if (name.text === 'path') {
                                            if (ts.isStringLiteral(it.initializer)) {
                                                path = it.initializer.text;
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
            }
        }
        return node;
    }
    sourceFile.forEachChild(visitor, (nodes) => {
        for (let node of nodes) {
            const res = visitor(node);
        }
    });
    return path;
}
