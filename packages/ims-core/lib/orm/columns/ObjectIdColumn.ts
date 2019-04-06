import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface ObjectIdColumn { }
export const ObjectIdColumnMetadataKey = 'ObjectIdColumnMetadataKey'
export const ObjectIdColumn = makeDecorator<ObjectIdColumn>(ObjectIdColumnMetadataKey);
export function isObjectIdColumnPropertyAst(val: PropertyAst): val is PropertyAst<ObjectIdColumn> {
    return val.metadataKey === ObjectIdColumnMetadataKey;
}
export class ObjectIdColumnAst extends PropertyContext<ObjectIdColumn>{ }
