import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface VersionColumn {
}
export declare const VersionColumnMetadataKey = "VersionColumnMetadataKey";
export declare const VersionColumn: (metadataDef?: VersionColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isVersionColumnPropertyAst(val: PropertyAst): val is PropertyAst<VersionColumn>;
export declare class VersionColumnAst extends PropertyContext<VersionColumn> {
}
