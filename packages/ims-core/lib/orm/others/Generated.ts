import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
export type GeneratedOptions = "increment" | "uuid" | "rowid";
export const GeneratedMetadataKey = 'GeneratedMetadataKey'
export const Generated = makeDecorator<GeneratedOptions>(GeneratedMetadataKey);
export class GeneratedAst extends PropertyContext<GeneratedOptions>{ }
export function isGeneratedPropertyAst(val: PropertyAst): val is PropertyAst<GeneratedOptions> {
    return val.metadataKey === GeneratedMetadataKey;
}
