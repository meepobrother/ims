import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export type CheckOptions = string;
export const CheckMetadataKey = 'CheckMetadataKey'
export const Check = makeDecorator<CheckOptions>(CheckMetadataKey);
export class CheckAst extends PropertyContext<CheckOptions>{ }
export function isCheckPropertyAst(val: PropertyAst): val is PropertyAst<CheckOptions> {
    return val.metadataKey === CheckMetadataKey;
}
