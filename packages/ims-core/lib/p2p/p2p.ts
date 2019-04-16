import { makeDecorator, PropertyContext, PropertyAst } from 'ims-decorator';
import Libp2p from 'libp2p';

export interface P2pOptions { };
export const P2pMetadataKey = 'P2pMetadataKey'
export const P2p = makeDecorator<P2pOptions>(P2pMetadataKey);

export function isP2pPrototypeAst(val: PropertyAst): val is PropertyAst<P2pOptions> {
    return val.metadataKey === P2pMetadataKey;
}
export class P2pPropertyAst extends PropertyContext<P2pOptions> { }
export interface P2pProperty extends Libp2p { }

