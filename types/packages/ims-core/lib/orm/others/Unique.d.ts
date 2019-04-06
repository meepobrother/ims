import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface Unique {
    name?: string;
    fields?: string[];
}
export declare const UniqueMetadataKey = "UniqueMetadataKey";
export declare const Unique: (metadataDef?: Unique & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class UniqueAst extends PropertyContext<Unique> {
}
export declare function isUniquePropertyAst(val: PropertyAst): val is PropertyAst<Unique>;
