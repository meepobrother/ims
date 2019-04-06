import { makeDecorator, PropertyContext } from 'ims-decorator';
export const OutputMetadataKey = 'OutputMetadataKey';
export interface Output { }
export const Output = makeDecorator<Output>(OutputMetadataKey);
export class OutputAst extends PropertyContext<Output> { }
