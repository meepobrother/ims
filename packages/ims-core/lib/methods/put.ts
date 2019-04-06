import { makeDecorator, MethodAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export const PutMetadataKey = 'PutMetadataKey';
export interface Put extends IHttpMethod { }
export const Put = makeDecorator<Put>(PutMetadataKey);
export function isPutMethodAst(val: MethodAst): val is MethodAst<Put> {
    return val.metadataKey === PutMetadataKey;
}
export class PutAst extends HttpMethodContext<Put>{
}
