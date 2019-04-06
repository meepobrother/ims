import { makeDecorator, MethodAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export const OptionMetadataKey = 'OptionMetadataKey';
export interface Option extends IHttpMethod { }
export const Option = makeDecorator<Option>(OptionMetadataKey);
export function isOptionMethodAst(val: MethodAst): val is MethodAst<Option> {
    return val.metadataKey === OptionMetadataKey;
}
export class OptionAst extends HttpMethodContext<Option>{
}
