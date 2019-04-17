import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface PrimaryColumn {
}
export declare const PrimaryColumnMetadataKey = "PrimaryColumnMetadataKey";
export declare const PrimaryColumn: (metadataDef?: PrimaryColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isPrimaryColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryColumn>;
export declare class PrimaryColumnAst extends PropertyContext<PrimaryColumn> {
}
