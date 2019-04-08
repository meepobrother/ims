import { makeDecorator, MethodAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export const GetMetadataKey = 'GetMetadataKey';
export interface Get extends IHttpMethod {
    path?: string;
    desc?: string;
}
export const Get = makeDecorator<Get>(GetMetadataKey);
export function isGetMethodAst(val: MethodAst): val is MethodAst<Get> {
    return val.metadataKey === GetMetadataKey;
}
export class GetAst extends HttpMethodContext<Get> { }