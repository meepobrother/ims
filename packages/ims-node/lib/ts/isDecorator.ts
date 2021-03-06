import ts from 'typescript';
export const isControllerDecorator = isDecorator('Controller');
export const isAddonDecorator = isDecorator('Addon');

export function isDecorator(name: string) {
    return (node: ts.Decorator): boolean => {
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