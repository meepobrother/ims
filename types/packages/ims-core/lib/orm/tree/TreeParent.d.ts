import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface TreeParent {
}
export declare const TreeParentMetadataKey = "TreeParentMetadataKey";
export declare const TreeParent: (metadataDef?: TreeParent & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isTreeParentPropertyAst(val: PropertyAst): val is PropertyAst<TreeParent>;
export declare class TreeParentAst extends PropertyContext<TreeParent> {
}
