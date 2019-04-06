import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface Index {
}
export declare const IndexMetadataKey = "IndexMetadataKey";
export declare const Index: (metadataDef?: Index & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class IndexAst extends PropertyContext<Index> {
}
export declare function isIndexPropertyAst(val: PropertyAst): val is PropertyAst<Index>;
