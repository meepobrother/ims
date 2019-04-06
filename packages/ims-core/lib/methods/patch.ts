import { makeDecorator, MethodAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export const PatchMetadataKey = 'PatchMetadataKey';
export interface Patch extends IHttpMethod { }
export const Patch = makeDecorator<Patch>(PatchMetadataKey);
export function isPatchMethodAst(val: MethodAst): val is MethodAst<Patch> {
    return val.metadataKey === PatchMetadataKey;
}
export class PatchAst extends HttpMethodContext<Patch> { }
