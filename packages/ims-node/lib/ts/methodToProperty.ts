import {
    hasMethodGetDecorator,
    hasMethodPostDecorator,
    hasMethodAllDecorator,
    hasMethodDeleteDecorator,
    hasMethodHeadDecorator,
    hasMethodPatchDecorator,
    hasMethodPutDecorator,
    hasMethodRoleDecorator
} from './hasDecorator'
import ts from 'typescript';
export function methodToProperty(member: ts.MethodDeclaration) {
    try {
        const nodes = member.parameters.map(par => par.type);
        const p = ts.createTupleTypeNode(nodes);
        let type: ts.TypeReferenceNode;
        let any = ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
        let decoratorInterfaces = [];
        if (hasMethodRoleDecorator(member)) {
            decoratorInterfaces.push('Role')
        }
        if (hasMethodGetDecorator(member)) {
            type = ts.createTypeReferenceNode('GetProperty', [p, member.type || any])
            decoratorInterfaces.push('Get', 'GetProperty')
        }
        else if (hasMethodPostDecorator(member)) {
            type = ts.createTypeReferenceNode('PostProperty', [p, member.type || any])
            decoratorInterfaces.push('Post', 'PostProperty')
        }
        else if (hasMethodAllDecorator(member)) {
            type = ts.createTypeReferenceNode('AllProperty', [p, member.type || any])
            decoratorInterfaces.push('All', 'AllProperty')
        }
        else if (hasMethodDeleteDecorator(member)) {
            type = ts.createTypeReferenceNode('DeleteProperty', [p, member.type || any])
            decoratorInterfaces.push('Delete', 'DeleteProperty')
        }
        else if (hasMethodHeadDecorator(member)) {
            type = ts.createTypeReferenceNode('HeadProperty', [p, member.type || any])
            decoratorInterfaces.push('Head', 'HeadProperty')
        }
        else if (hasMethodPatchDecorator(member)) {
            type = ts.createTypeReferenceNode('PatchProperty', [p, member.type || any])
            decoratorInterfaces.push('Patch', 'PatchProperty')
        }
        else if (hasMethodPutDecorator(member)) {
            type = ts.createTypeReferenceNode('PutProperty', [p, member.type || any])
            decoratorInterfaces.push('Put', 'PutProperty')
        }
        if (!!type) {
            return {
                property: ts.createProperty(member.decorators, [], member.name, undefined, type, undefined),
                imports: decoratorInterfaces
            }
        }
    } catch (e) {
        throw e;
    }
}
