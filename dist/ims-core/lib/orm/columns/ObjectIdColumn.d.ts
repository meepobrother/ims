import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface ObjectIdColumn {
}
export declare const ObjectIdColumnMetadataKey = "ObjectIdColumnMetadataKey";
export declare const ObjectIdColumn: (metadataDef?: ObjectIdColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isObjectIdColumnPropertyAst(val: PropertyAst): val is PropertyAst<ObjectIdColumn>;
export declare class ObjectIdColumnAst extends PropertyContext<ObjectIdColumn> {
}
