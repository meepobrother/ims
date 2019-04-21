import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface CreateDateColumn {
}
export declare const CreateDateColumnMetadataKey = "CreateDateColumnMetadataKey";
export declare const CreateDateColumn: (metadataDef?: CreateDateColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isCreateDateColumnPropertyAst(val: PropertyAst): val is PropertyAst<CreateDateColumn>;
export declare class CreateDateColumnAst extends PropertyContext<CreateDateColumn> {
}
