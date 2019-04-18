"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hasDecorator_1 = require("./hasDecorator");
const typescript_1 = __importDefault(require("typescript"));
function methodToProperty(member) {
    const nodes = member.parameters.map(par => par.type);
    const p = typescript_1.default.createTupleTypeNode(nodes);
    let type;
    let any = typescript_1.default.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword);
    let decoratorInterfaces = [];
    if (hasDecorator_1.hasMethodRoleDecorator(member)) {
        decoratorInterfaces.push('Role');
    }
    if (hasDecorator_1.hasMethodGetDecorator(member)) {
        type = typescript_1.default.createTypeReferenceNode('GetProperty', [p, member.type || any]);
        decoratorInterfaces.push('Get', 'GetProperty');
    }
    else if (hasDecorator_1.hasMethodPostDecorator(member)) {
        type = typescript_1.default.createTypeReferenceNode('PostProperty', [p, member.type || any]);
        decoratorInterfaces.push('Post', 'PostProperty');
    }
    else if (hasDecorator_1.hasMethodAllDecorator(member)) {
        type = typescript_1.default.createTypeReferenceNode('AllProperty', [p, member.type || any]);
        decoratorInterfaces.push('All', 'AllProperty');
    }
    else if (hasDecorator_1.hasMethodDeleteDecorator(member)) {
        type = typescript_1.default.createTypeReferenceNode('DeleteProperty', [p, member.type || any]);
        decoratorInterfaces.push('Delete', 'DeleteProperty');
    }
    else if (hasDecorator_1.hasMethodHeadDecorator(member)) {
        type = typescript_1.default.createTypeReferenceNode('HeadProperty', [p, member.type || any]);
        decoratorInterfaces.push('Head', 'HeadProperty');
    }
    else if (hasDecorator_1.hasMethodPatchDecorator(member)) {
        type = typescript_1.default.createTypeReferenceNode('PatchProperty', [p, member.type || any]);
        decoratorInterfaces.push('Patch', 'PatchProperty');
    }
    else if (hasDecorator_1.hasMethodPutDecorator(member)) {
        type = typescript_1.default.createTypeReferenceNode('PutProperty', [p, member.type || any]);
        decoratorInterfaces.push('Put', 'PutProperty');
    }
    if (!!type) {
        return {
            property: typescript_1.default.createProperty(member.decorators, [], member.name, undefined, type, undefined),
            imports: decoratorInterfaces
        };
    }
}
exports.methodToProperty = methodToProperty;
