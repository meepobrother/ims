import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterInsert {
}
export declare const AfterInsertMetadataKey = "AfterInsertMetadataKey";
export declare const AfterInsert: (metadataDef?: AfterInsert & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class AfterInsertAst extends PropertyContext<AfterInsert> {
}
export declare function isAfterInsertPropertyAst(val: PropertyAst): val is PropertyAst<AfterInsert>;
