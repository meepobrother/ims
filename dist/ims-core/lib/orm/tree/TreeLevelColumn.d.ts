import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeLevelColumn {
}
export declare const TreeLevelColumnMetadataKey = "TreeLevelColumnMetadataKey";
export declare const TreeLevelColumn: (metadataDef?: TreeLevelColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isTreeLevelColumnPropertyAst(val: PropertyAst): val is PropertyAst<TreeLevelColumn>;
export declare class TreeLevelColumnAst extends PropertyContext<TreeLevelColumn> {
}
