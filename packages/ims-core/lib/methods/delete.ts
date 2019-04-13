import { makeDecorator, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
export const DeleteMetadataKey = 'DeleteMetadataKey';
import { HttpMethodContext, IHttpMethod } from './method';
export interface Delete extends IHttpMethod { }
export const Delete = makeDecorator<Delete>(DeleteMetadataKey);
export function isDeleteMethodAst(val: MethodAst): val is MethodAst<Delete> {
    return val.metadataKey === DeleteMetadataKey;
}
export class DeleteMethodAst extends HttpMethodContext<Delete> {
}

export function isDeletePropertyAst(val: PropertyAst): val is PropertyAst<Delete> {
    return val.metadataKey === DeleteMetadataKey;
}
export class DeletePropertyAst extends PropertyContext<Delete> {
}
