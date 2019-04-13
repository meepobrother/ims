import { makeDecorator, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
export const AllMetadataKey = 'AllMetadataKey';
import { HttpMethodContext, IHttpMethod } from './method';
export interface All extends IHttpMethod { }
export const All = makeDecorator<All>(AllMetadataKey);
export function isAllMethodAst(val: MethodAst): val is MethodAst<All> {
    return val.metadataKey === AllMetadataKey;
}
export class AllMethodAst extends HttpMethodContext<All> {
}

export function isAllPropertyAst(val: PropertyAst): val is PropertyAst<All> {
    return val.metadataKey === AllMetadataKey;
}
export class AllPropertyAst extends PropertyContext<All> {
}
