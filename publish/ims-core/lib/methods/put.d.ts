import { MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export declare const PutMetadataKey = "PutMetadataKey";
export interface Put extends IHttpMethod {
}
export declare const Put: (metadataDef?: Put & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isPutMethodAst(val: MethodAst): val is MethodAst<Put>;
export declare class PutMethodAst extends HttpMethodContext<Put> {
}
export declare function isPutPropertyAst(val: PropertyAst): val is PropertyAst<Put>;
export declare class PutPropertyAst extends PropertyContext<Put> {
}
