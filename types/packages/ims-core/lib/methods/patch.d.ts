import { MethodAst } from 'ims-common';
import { HttpMethodContext, IHttpMethod } from './method';
export declare const PatchMetadataKey = "PatchMetadataKey";
export interface Patch extends IHttpMethod {
}
export declare const Patch: (metadataDef?: Patch & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isPatchMethodAst(val: MethodAst): val is MethodAst<Patch>;
export declare class PatchAst extends HttpMethodContext<Patch> {
}
