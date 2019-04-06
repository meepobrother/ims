import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface VersionColumn { }
export const VersionColumnMetadataKey = 'VersionColumnMetadataKey'
export const VersionColumn = makeDecorator<VersionColumn>(VersionColumnMetadataKey);
export function isVersionColumnPropertyAst(val: PropertyAst): val is PropertyAst<VersionColumn> {
    return val.metadataKey === VersionColumnMetadataKey;
}
export class VersionColumnAst extends PropertyContext<VersionColumn>{ }
