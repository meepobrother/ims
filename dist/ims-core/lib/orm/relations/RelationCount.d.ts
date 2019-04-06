import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface RelationCount {
    relation: string | ((object: any) => any);
}
export declare const RelationCountMetadataKey = "RelationCountMetadataKey";
export declare const RelationCount: (metadataDef?: RelationCount & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isRelationCountPropertyAst(val: PropertyAst): val is PropertyAst<RelationCount>;
export declare class RelationCountAst extends PropertyContext<RelationCount> {
}
