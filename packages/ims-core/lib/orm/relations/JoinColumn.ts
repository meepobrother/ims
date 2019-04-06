import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface JoinColumn { }
export const JoinColumnMetadataKey = 'JoinColumnMetadataKey'
export const JoinColumn = makeDecorator<JoinColumn>(JoinColumnMetadataKey);
export function isJoinColumnPropertyAst(val: PropertyAst): val is PropertyAst<JoinColumn> {
    return val.metadataKey === JoinColumnMetadataKey;
}
export class JoinColumnAst extends PropertyContext<JoinColumn>{ }
