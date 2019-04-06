import { MethodAst } from 'ims-common';
import { HttpMethodContext, IHttpMethod } from './method';
export declare const OptionMetadataKey = "OptionMetadataKey";
export interface Option extends IHttpMethod {
}
export declare const Option: (metadataDef?: Option & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isOptionMethodAst(val: MethodAst): val is MethodAst<Option>;
export declare class OptionAst extends HttpMethodContext<Option> {
}
