import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface RelationId {
    relation: string | ((object: any) => any);
}
export declare const RelationIdMetadataKey = "RelationIdMetadataKey";
export declare const RelationId: (metadataDef?: RelationId & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isRelationIdPropertyAst(val: PropertyAst): val is PropertyAst<RelationId>;
export declare class RelationIdAst extends PropertyContext<RelationId> {
}
