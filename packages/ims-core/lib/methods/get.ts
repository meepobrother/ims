import { makeDecorator, MethodAst, PropertyAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod, HttpPropertyContext } from './method';
export const GetMetadataKey = 'GetMetadataKey';
export interface Get extends IHttpMethod { }
export const Get = makeDecorator<Get>(GetMetadataKey);
export function isGetMethodAst(val: MethodAst): val is MethodAst<Get> {
    return val.metadataKey === GetMetadataKey;
}
export class GetMethodAst extends HttpMethodContext<Get> { }

export function isGetPropertyAst(val: PropertyAst): val is PropertyAst<Get> {
    return val.metadataKey === GetMetadataKey;
}
export class GetPropertyAst extends HttpPropertyContext<Get> { }

export interface GetProperty<P extends Array<any>, T> {
    (...opts: P): T;
}