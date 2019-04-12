import { ProtocolMetadataKey, ProtocolPropertyAst, ProtocolMethodAst, AddonMetadataKey, AddonAst, ControllerAst, ControllerMetadataKey } from "ims-core";
import { TypeContext } from 'ims-decorator';
import Libp2p from 'libp2p'
export function transformProtocol(context: TypeContext) {
    /** 属性 */
    const propertys = context.getProperty(ProtocolMetadataKey) as ProtocolPropertyAst[];
    propertys.map(property => transformProtocolProperty(property, context))
    /** 方法 */
    const methods = context.getMethod(ProtocolMetadataKey) as ProtocolMethodAst[];
    methods.map(method => transformProtocolMethod(method, context))
}
function transformProtocolProperty(property: ProtocolPropertyAst, context: TypeContext) {
    context.instance[property.ast.propertyKey] = {}
}
function transformProtocolMethod(method: ProtocolMethodAst, context: TypeContext) {
    const libp2p = context.get<Libp2p>('libp2p');
    const addon = context.getClass(AddonMetadataKey) as AddonAst;
    const controller = context.getClass(ControllerMetadataKey) as ControllerAst;
    const def = method.ast.metadataDef;
    libp2p.handle(`${addon.path}/${controller.path}/${method.name}`, (protocol: any, conn: any) => { })
}
