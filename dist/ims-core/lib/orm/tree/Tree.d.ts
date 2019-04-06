import { ClassAst, ClassContext } from 'ims-decorator';
export declare type TreeOptions = "adjacency-list" | "closure-table" | "nested-set" | "materialized-path";
export declare const TreeMetadataKey = "TreeMetadataKey";
export declare const Tree: (metadataDef?: ("adjacency-list" & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) | ("closure-table" & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) | ("nested-set" & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) | ("materialized-path" & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
})) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isTreeClassAst(val: ClassAst): val is ClassAst<TreeOptions>;
export declare class TreeAst extends ClassContext<TreeOptions> {
}
