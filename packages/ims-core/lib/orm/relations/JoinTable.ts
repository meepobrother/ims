import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface JoinTable { }
export const JoinTableMetadataKey = 'JoinTableMetadataKey'
export const JoinTable = makeDecorator<JoinTable>(JoinTableMetadataKey);
export function isJoinTablePropertyAst(val: PropertyAst): val is PropertyAst<JoinTable> {
    return val.metadataKey === JoinTableMetadataKey;
}
export class JoinTableAst extends PropertyContext<JoinTable>{ }
