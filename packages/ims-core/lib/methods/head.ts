import { makeDecorator, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
export const HeadMetadataKey = 'HeadMetadataKey';
import { HttpMethodContext, IHttpMethod } from './method';
export interface Head extends IHttpMethod { }
export const Head = makeDecorator<Head>(HeadMetadataKey);
export function isHeadMethodAst(val: MethodAst): val is MethodAst<Head> {
    return val.metadataKey === HeadMetadataKey;
}
export class HeadMethodAst extends HttpMethodContext<Head> {
}
export function isHeadPropertyAst(val: PropertyAst): val is PropertyAst<Head> {
    return val.metadataKey === HeadMetadataKey;
}
export class HeadPropertyAst extends PropertyContext<Head> {
}
