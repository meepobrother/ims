import { ProtocolMetadataKey, ProtocolPropertyAst, ProtocolMethodAst, AddonMetadataKey, AddonAst, ControllerAst, ControllerMetadataKey, ProtocolParameterAst, BodyAst } from "ims-core";
import { TypeContext } from 'ims-decorator';
const pull = require('pull-stream');
const Pushable = require('pull-pushable');
import Libp2p from 'libp2p';
export function transformProtocol(context: TypeContext, options: Libp2p) {
    /** 属性 */
    const propertys = context.getProperty(ProtocolMetadataKey) as ProtocolPropertyAst[];
    propertys.map(property => transformProtocolProperty(property, context, options))
    /** 方法 */
    const methods = context.getMethod(ProtocolMetadataKey) as ProtocolMethodAst[];
    methods.map(method => transformProtocolMethod(method, context, options))
}
function transformProtocolProperty(property: ProtocolPropertyAst, context: TypeContext, options: Libp2p) {
    context.instance[property.ast.propertyKey] = {
        handle: (protocol: string, handlerFunc: (protocol: any, conn: any) => {}, matchFunc?: any) => {
            return options.handle(protocol, handlerFunc, matchFunc)
        },
        unhandle: (protocol: string) => {
            return options.unhandle(protocol)
        }
    }
}
function transformProtocolMethod(method: ProtocolMethodAst, context: TypeContext, options: Libp2p) {
    const addon = context.getClass(AddonMetadataKey) as AddonAst;
    const controller = context.getClass(ControllerMetadataKey) as ControllerAst;
    const path = `${addon.path}/${controller.path}/${method.name}`;
    const mth = context.instance[method.ast.propertyKey].bind(context.instance);
    const params = new Array(method.ast.parameterLength);
    const p = Pushable()
    options.unhandle(path);
    options.handle(path, (protocol: any, conn: any) => {
        pull(p, conn);
        const handler = (data: string) => p.push(data)
        pull(conn, pull.map((data) => {
            const item = data.toString('utf8').replace('\n', '')
            method.parameters.map(par => {
                if (par instanceof ProtocolParameterAst) {
                    // 回复消息
                    params[par.ast.parameterIndex] = handler;
                } else if (par instanceof BodyAst) {
                    // 接收消息
                    params[par.ast.parameterIndex] = item;
                } else {
                    console.log(`transformProtocolMethod:${path} ${par.ast.metadataKey} parameter not found handler`)
                }
            });
            mth(...params);
        }));
    });
}
