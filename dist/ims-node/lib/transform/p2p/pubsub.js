"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const peer_info_1 = __importDefault(require("peer-info"));
const peer_id_1 = __importDefault(require("peer-id"));
const pull = require('pull-stream');
const Pushable = require('pull-pushable');
const pubsubDebug = (msg) => console.log(`transform:pubsub:${msg}`);
function transformPubsub(context, options) {
    /** 属性 */
    const propertys = context.getProperty(ims_core_1.PubsubMetadataKey);
    propertys.map(property => transformPubsubProperty(property, context, options));
    /** 方法 */
    const methods = context.getMethod(ims_core_1.PubsubMetadataKey);
    methods.map(method => transformPubsubMethod(method, context, options));
}
exports.transformPubsub = transformPubsub;
function transformPubsubProperty(property, context, options) {
    context.instance[property.ast.propertyKey] = options.libp2p.pubsub;
}
function transformPubsubMethod(method, context, options) {
    const addon = context.getClass(ims_core_1.AddonMetadataKey);
    const controller = context.getClass(ims_core_1.ControllerMetadataKey);
    const path = `${addon.path}/${controller.path}/${method.name}`;
    const mth = context.instance[method.ast.propertyKey].bind(context.instance);
    const params = new Array(method.ast.parameterLength);
    pubsubDebug(`registe pubsub ${path}`);
    options.libp2p.pubsub.subscribe(path, (msg) => {
        method.parameters.map(par => {
            if (par instanceof ims_core_1.ProtocolParameterAst) {
                // 回复
                params[par.ast.parameterIndex] = (path, callback) => {
                    const id = peer_id_1.default.createFromB58String(msg.from);
                    const peer = new peer_info_1.default(id);
                    const p = Pushable();
                    options.libp2p.dialProtocol(peer, path, (err, conn) => {
                        if (err)
                            callback(err, null, null);
                        pull(p, conn);
                        const handler = (data) => p.push(data);
                        pull(conn, pull.map((data) => {
                            callback(err, data, handler);
                        }));
                        callback(err, null, handler);
                    });
                };
            }
            else if (par instanceof ims_core_1.BodyAst) {
                params[par.ast.parameterIndex] = msg;
            }
            else {
                pubsubDebug(`transformProtocolMethod:${path} ${par.ast.metadataKey} parameter not found handler`);
            }
        });
        mth(...params);
    });
}
