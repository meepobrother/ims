import { makeDecorator, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export const PatchMetadataKey = 'PatchMetadataKey';
export interface Patch extends IHttpMethod { }
export const Patch = makeDecorator<Patch>(PatchMetadataKey);
export function isPatchMethodAst(val: MethodAst): val is MethodAst<Patch> {
    return val.metadataKey === PatchMetadataKey;
}
export class PatchMethodAst extends HttpMethodContext<Patch> { }
export function isPatchPropertyAst(val: PropertyAst): val is PropertyAst<Patch> {
    return val.metadataKey === PatchMetadataKey;
}
export class PatchPropertyAst extends PropertyContext<Patch> { }
