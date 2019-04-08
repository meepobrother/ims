import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface BeforeInsert {
}
export declare const BeforeInsertMetadataKey = "BeforeInsertMetadataKey";
export declare const BeforeInsert: (metadataDef?: BeforeInsert & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class BeforeInsertAst extends PropertyContext<BeforeInsert> {
}
export declare function isBeforeInsertPropertyAst(val: PropertyAst): val is PropertyAst<BeforeInsert>;
