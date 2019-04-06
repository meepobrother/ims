import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ColumnOptions } from 'typeorm';
export declare type Column = ColumnOptions;
export declare const ColumnMetadataKey = "ColumnMetadataKey";
export declare const Column: (metadataDef?: ColumnOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isColumnPropertyAst(val: PropertyAst): val is PropertyAst<Column>;
export declare class ColumnAst extends PropertyContext<Column> {
}
