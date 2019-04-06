import { makeDecorator, MethodAst } from 'ims-decorator';
export const DeleteMetadataKey = 'DeleteMetadataKey';
import { HttpMethodContext, IHttpMethod } from './method';
export interface Delete extends IHttpMethod { }
export const Delete = makeDecorator<Delete>(DeleteMetadataKey);
export function isDeleteMethodAst(val: MethodAst): val is MethodAst<Delete> {
    return val.metadataKey === DeleteMetadataKey;
}
export class DeleteAst extends HttpMethodContext<Delete> {
}
