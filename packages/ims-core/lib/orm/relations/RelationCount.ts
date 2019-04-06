import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface RelationCount {
    relation: string | ((object: any) => any)
}
export const RelationCountMetadataKey = 'RelationCountMetadataKey'
export const RelationCount = makeDecorator<RelationCount>(RelationCountMetadataKey);
export function isRelationCountPropertyAst(val: PropertyAst): val is PropertyAst<RelationCount> {
    return val.metadataKey === RelationCountMetadataKey;
}
export class RelationCountAst extends PropertyContext<RelationCount>{ }
