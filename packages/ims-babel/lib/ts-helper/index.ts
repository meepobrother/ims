import * as ts from 'typescript'
export function template(code: string) {
    return (
        props: object,
        fileName: string = '',
        languageVersion: ts.ScriptTarget = ts.ScriptTarget.ESNext,
        setParentNodes?: boolean,
        scriptKind?: ts.ScriptKind
    ) => {
        const sourceFile = ts.createSourceFile(
            fileName,
            code,
            languageVersion,
            setParentNodes,
            scriptKind
        );
        const visitChild = (node: ts.Node) => {
            if (ts.isIdentifier(node)) {
                let val = node.text;
                if (props[node.text]) val = props[node.text];
                return ts.createIdentifier(val);
            } else if (ts.isVariableStatement(node)) {
                let modifiers = [];
                if (node.modifiers) {
                    modifiers = node.modifiers.map(modifier => modifier.forEachChild(visitChild, visitChildren));
                }
                const declarationList = node.declarationList.forEachChild(visitChild, visitChildren)
                return ts.createVariableStatement(modifiers, declarationList)
            } else if (ts.isVariableDeclarationList(node)) {
                return ts.createVariableDeclarationList(node.declarations);
            } else if (ts.isVariableDeclaration(node)) {
                let name = node.name;
                if (ts.isBindingName(name)) {
                    name = name.forEachChild(visitChild, visitChildren)
                }
                const type = node.type && node.type.forEachChild(visitChild, visitChildren)
                const initializer = node.initializer && node.initializer.forEachChild(visitChild, visitChildren);
                return ts.createVariableDeclaration(name, type, initializer)
            } else {
                return node;
            }
        }
        const visitChildren = (nodes: ts.NodeArray<ts.Node>) => {
            return ts.createNodeArray(nodes.map(node => visitChild(node)))
        }
        const ast = sourceFile.forEachChild<any>(visitChild, visitChildren);
        const printer = ts.createPrinter();
        const str = printer.printList(ts.ListFormat.None, ast, sourceFile)
        debugger;
    };
}

template(`
const React = require('react')
`)({
    react: 'ims-core'
})