import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface RelationId {
    relation: string | ((object: any) => any)
 }
export const RelationIdMetadataKey = 'RelationIdMetadataKey'
export const RelationId = makeDecorator<RelationId>(RelationIdMetadataKey);
export function isRelationIdPropertyAst(val: PropertyAst): val is PropertyAst<RelationId> {
    return val.metadataKey === RelationIdMetadataKey;
}
export class RelationIdAst extends PropertyContext<RelationId>{ }
