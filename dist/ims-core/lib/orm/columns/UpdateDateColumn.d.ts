import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface UpdateDateColumn {
}
export declare const UpdateDateColumnMetadataKey = "UpdateDateColumnMetadataKey";
export declare const UpdateDateColumn: (metadataDef?: UpdateDateColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isUpdateDateColumnPropertyAst(val: PropertyAst): val is PropertyAst<UpdateDateColumn>;
export declare class UpdateDateColumnAst extends PropertyContext<UpdateDateColumn> {
}
