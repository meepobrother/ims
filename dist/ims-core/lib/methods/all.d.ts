import { MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
export declare const AllMetadataKey = "AllMetadataKey";
import { HttpMethodContext, IHttpMethod } from './method';
export interface All extends IHttpMethod {
}
export declare const All: (metadataDef?: All & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isAllMethodAst(val: MethodAst): val is MethodAst<All>;
export declare class AllMethodAst extends HttpMethodContext<All> {
}
export declare function isAllPropertyAst(val: PropertyAst): val is PropertyAst<All>;
export declare class AllPropertyAst extends PropertyContext<All> {
}
