import ts from 'typescript';
export function isDecorator(name: string) {
    return (node: ts.Node): boolean => {
        if (ts.isDecorator(node)) {
            const expression = node.expression
            if (ts.isCallExpression(expression)) {
                const express = expression.expression
                if (ts.isIdentifier(express)) {
                    const { text } = express;
                    if (text === name) {
                        return true;
                    }
                }
            }
        }
    }
}