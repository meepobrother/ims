import { TypeContext } from "ims-decorator";
import { P2pPropertyAst, ContentRoutingPropertyAst, ContentRoutingMetadataKey } from "ims-core";
import Libp2p from 'libp2p'
export function transformContentRouting(context: TypeContext, libp2p: Libp2p) {
    /** 属性 */
    const propertys = context.getProperty(ContentRoutingMetadataKey) as ContentRoutingPropertyAst[];
    propertys.map(property => transformContentRoutingProperty(property, context, libp2p))
}
function transformContentRoutingProperty(property: P2pPropertyAst, context: TypeContext, libp2p: Libp2p) {
    context.instance[property.ast.propertyKey] = libp2p.contentRouting;
}
