import { MethodContext, MethodAst } from 'ims-common';
export declare const ReducerMetadataKey = "ReducerMetadataKey";
export interface Reducer {
}
export declare const Reducer: (metadataDef?: Reducer & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class ReducerAst extends MethodContext<Reducer> {
}
export declare function isReducerMethodAst(val: MethodAst): val is MethodAst<Reducer>;
