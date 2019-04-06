import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface PrimaryColumn { }
export const PrimaryColumnMetadataKey = 'PrimaryColumnMetadataKey'
export const PrimaryColumn = makeDecorator<PrimaryColumn>(PrimaryColumnMetadataKey);
export function isPrimaryColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryColumn> {
    return val.metadataKey === PrimaryColumnMetadataKey;
}
export class PrimaryColumnAst extends PropertyContext<PrimaryColumn>{ }
