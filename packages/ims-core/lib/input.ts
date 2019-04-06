import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export const InputMetadataKey = 'InputMetadataKey';
export interface Input {
    alis: string;
}
export const Input = makeDecorator<Input>(InputMetadataKey);
export class InputAst extends PropertyContext<Input> { }
export function isInputPropertyAst(val: PropertyAst): val is PropertyAst<Input> {
    return val.metadataKey === InputMetadataKey;
}