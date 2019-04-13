import { TypeContext } from "ims-decorator";
import Libp2p from 'libp2p';
import { P2pMetadataKey, P2pPropertyAst } from "ims-core";
import { TransformOptions } from '../type'

export function transformP2p(context: TypeContext, options: TransformOptions) {
    /** 属性 */
    const propertys = context.getProperty(P2pMetadataKey) as P2pPropertyAst[];
    propertys.map(property => transformP2pProperty(property, context, options))
}

function transformP2pProperty(property: P2pPropertyAst, context: TypeContext, options: TransformOptions) {
    context.instance[property.ast.propertyKey] = options.libp2p;
}