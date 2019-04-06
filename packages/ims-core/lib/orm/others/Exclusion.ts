import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export type ExclusionOptions = string;
export const ExclusionMetadataKey = 'ExclusionMetadataKey'
export const Exclusion = makeDecorator<ExclusionOptions>(ExclusionMetadataKey);
export class ExclusionAst extends PropertyContext<ExclusionOptions>{ }
export function isExclusionPropertyAst(val: PropertyAst): val is PropertyAst<ExclusionOptions> {
    return val.metadataKey === ExclusionMetadataKey;
}
