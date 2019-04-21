import { MethodAst, PropertyAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod, HttpPropertyContext } from './method';
export declare const GetMetadataKey = "GetMetadataKey";
export interface Get extends IHttpMethod {
}
export declare const Get: (metadataDef?: Get & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isGetMethodAst(val: MethodAst): val is MethodAst<Get>;
export declare class GetMethodAst extends HttpMethodContext<Get> {
}
export declare function isGetPropertyAst(val: PropertyAst): val is PropertyAst<Get>;
export declare class GetPropertyAst extends HttpPropertyContext<Get> {
}
export interface GetProperty<P extends Array<any>, T> {
    (...opts: P): T;
}
