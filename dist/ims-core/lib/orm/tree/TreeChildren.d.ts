import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeChildren {
    cascade?: boolean | ("insert" | "update" | "remove")[];
}
export declare const TreeChildrenMetadataKey = "TreeChildrenMetadataKey";
export declare const TreeChildren: (metadataDef?: TreeChildren & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isTreeChildrenPropertyAst(val: PropertyAst): val is PropertyAst<TreeChildren>;
export declare class TreeChildrenAst extends PropertyContext<TreeChildren> {
}
