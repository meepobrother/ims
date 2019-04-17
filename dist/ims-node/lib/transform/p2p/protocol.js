"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const pull = require('pull-stream');
const Pushable = require('pull-pushable');
function transformProtocol(context, options) {
    /** 属性 */
    const propertys = context.getProperty(ims_core_1.ProtocolMetadataKey);
    propertys.map(property => transformProtocolProperty(property, context, options));
    /** 方法 */
    const methods = context.getMethod(ims_core_1.ProtocolMetadataKey);
    methods.map(method => transformProtocolMethod(method, context, options));
}
exports.transformProtocol = transformProtocol;
function transformProtocolProperty(property, context, options) {
    context.instance[property.ast.propertyKey] = {
        handle: (protocol, handlerFunc, matchFunc) => {
            return options.libp2p.handle(protocol, handlerFunc, matchFunc);
        },
        unhandle: (protocol) => {
            return options.libp2p.unhandle(protocol);
        }
    };
}
function transformProtocolMethod(method, context, options) {
    const addon = context.getClass(ims_core_1.AddonMetadataKey);
    const controller = context.getClass(ims_core_1.ControllerMetadataKey);
    const path = `${addon.path}/${controller.path}/${method.name}`;
    const mth = context.instance[method.ast.propertyKey].bind(context.instance);
    const params = new Array(method.ast.parameterLength);
    const p = Pushable();
    options.libp2p.handle(path, (protocol, conn) => {
        pull(p, conn);
        const handler = (data) => p.push(data);
        pull(conn, pull.map((data) => {
            const item = data.toString('utf8').replace('\n', '');
            method.parameters.map(par => {
                if (par instanceof ims_core_1.ProtocolParameterAst) {
                    // 回复消息
                    params[par.ast.parameterIndex] = handler;
                }
                else if (par instanceof ims_core_1.BodyAst) {
                    // 接收消息
                    params[par.ast.parameterIndex] = item;
                }
                else {
                    console.log(`transformProtocolMethod:${path} ${par.ast.metadataKey} parameter not found handler`);
                }
            });
            mth(...params);
        }));
    });
}
