import { TypeContext } from "ims-decorator";
import { P2pMetadataKey, P2pPropertyAst } from "ims-core";
import Libp2p from 'libp2p'

export function transformP2p(context: TypeContext, libp2p: Libp2p) {
    /** 属性 */
    const propertys = context.getProperty(P2pMetadataKey) as P2pPropertyAst[];
    propertys.map(property => transformP2pProperty(property, context, libp2p))
}

function transformP2pProperty(property: P2pPropertyAst, context: TypeContext, libp2p: Libp2p) {
    context.instance[property.ast.propertyKey] = libp2p;
}