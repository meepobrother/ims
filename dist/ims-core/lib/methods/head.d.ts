import { MethodAst } from 'ims-decorator';
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
export declare class HeadAst extends HttpMethodContext<Head> {
}
