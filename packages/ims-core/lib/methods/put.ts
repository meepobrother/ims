import { makeDecorator, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export const PutMetadataKey = 'PutMetadataKey';
export interface Put extends IHttpMethod { }
export const Put = makeDecorator<Put>(PutMetadataKey);
export function isPutMethodAst(val: MethodAst): val is MethodAst<Put> {
    return val.metadataKey === PutMetadataKey;
}
export class PutMethodAst extends HttpMethodContext<Put>{
}

export function isPutPropertyAst(val: PropertyAst): val is PropertyAst<Put> {
    return val.metadataKey === PutMetadataKey;
}
export class PutPropertyAst extends PropertyContext<Put>{
}