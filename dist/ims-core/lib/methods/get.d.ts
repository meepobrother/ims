import { MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export declare const GetMetadataKey = "GetMetadataKey";
export interface Get extends IHttpMethod {
    path?: string;
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
export declare class GetPropertyAst extends PropertyContext<Get> {
}