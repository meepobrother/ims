import ts from 'typescript';
import { isDecorator } from './isDecorator'
export function hasClassDecorator(name: string) {
    return (node: ts.ClassDeclaration) => {
        return node.decorators.some(it => {
            return isDecorator(name)(it)
        });
    }
}

export function hasPropertyDecorator(name: string) {
    return (node: ts.PropertyDeclaration) => {
        if (node && node.decorators && node.decorators.length > 0) {
            return node.decorators.some(it => {
                return isDecorator(name)(it)
            });
        } else {
            return false;
        }
    }
}

export function hasParameterDecorator(name: string) {
    return (node: ts.ParameterDeclaration) => {
        if (node && node.decorators && node.decorators.length > 0) {
            return node.decorators.some(it => {
                return isDecorator(name)(it)
            });
        } else {
            return false;
        }
    }
}

export function hasMethodDecorator(name: string) {
    return (node: ts.MethodDeclaration) => {
        if (node && node.decorators && node.decorators.length > 0) {
            return node.decorators.some(it => {
                return isDecorator(name)(it)
            });
        } else {
            return false;
        }
    }
}
