import { MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
export declare const HeadMetadataKey = "HeadMetadataKey";
import { HttpMethodContext, IHttpMethod } from './method';
export interface Head extends IHttpMethod {
}
export declare const Head: (metadataDef?: Head & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isHeadMethodAst(val: MethodAst): val is MethodAst<Head>;
export declare class HeadMethodAst extends HttpMethodContext<Head> {
}
export declare function isHeadPropertyAst(val: PropertyAst): val is PropertyAst<Head>;
export declare class HeadPropertyAst extends PropertyContext<Head> {
}
