import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export interface Unique {
    name?: string;
    fields?: string[];
}
export const UniqueMetadataKey = 'UniqueMetadataKey'
export const Unique = makeDecorator<Unique>(UniqueMetadataKey);
export class UniqueAst extends PropertyContext<Unique>{ }
export function isUniquePropertyAst(val: PropertyAst): val is PropertyAst<Unique> {
    return val.metadataKey === UniqueMetadataKey;
}
