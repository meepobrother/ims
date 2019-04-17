import { TypeContext } from "ims-decorator";
import { P2pPropertyAst, ContentRoutingPropertyAst, ContentRoutingMetadataKey } from "ims-core";
import { TransformOptions } from '../type'

export function transformContentRouting(context: TypeContext, options: TransformOptions) {
    /** 属性 */
    const propertys = context.getProperty(ContentRoutingMetadataKey) as ContentRoutingPropertyAst[];
    propertys.map(property => transformContentRoutingProperty(property, context, options))
}

function transformContentRoutingProperty(property: P2pPropertyAst, context: TypeContext, options: TransformOptions) {
    context.instance[property.ast.propertyKey] = options.libp2p.contentRouting;
}
