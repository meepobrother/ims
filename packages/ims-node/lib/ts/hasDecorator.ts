import ts from 'typescript';
import { isDecorator } from './isDecorator'
export const hasControllerDecorator = hasClassDecorator('Controller');
export const hasAddonDecorator = hasClassDecorator('Addon');

export function hasClassDecorator(name: string) {
    return (node: ts.ClassDeclaration) => {
        return node.decorators.some(it => {
            return isDecorator(name)(it)
        });
    }
}

export const hasMethodGetDecorator = hasMethodDecorator('Get')
export const hasMethodPostDecorator = hasMethodDecorator('Post')
export const hasMethodPutDecorator = hasMethodDecorator('Put')
export const hasMethodDeleteDecorator = hasMethodDecorator('Delete')
export const hasMethodPatchDecorator = hasMethodDecorator('Patch')
export const hasMethodHeadDecorator = hasMethodDecorator('Head')
export const hasMethodAllDecorator = hasMethodDecorator('All')
export const hasMethodRoleDecorator = hasMethodDecorator('Role')


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