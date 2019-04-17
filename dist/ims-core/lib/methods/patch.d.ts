import { MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export declare const PatchMetadataKey = "PatchMetadataKey";
export interface Patch extends IHttpMethod {
}
export declare const Patch: (metadataDef?: Patch & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isPatchMethodAst(val: MethodAst): val is MethodAst<Patch>;
export declare class PatchMethodAst extends HttpMethodContext<Patch> {
}
export declare function isPatchPropertyAst(val: PropertyAst): val is PropertyAst<Patch>;
export declare class PatchPropertyAst extends PropertyContext<Patch> {
}
