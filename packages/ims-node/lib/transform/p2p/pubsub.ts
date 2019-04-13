import { PubsubMetadataKey, PubsubPropertyAst, PubsubMethodAst, AddonMetadataKey, AddonAst, ControllerMetadataKey, ControllerAst, BodyAst, ProtocolParameterAst } from 'ims-core';
import { TypeContext } from 'ims-decorator';
import Libp2p, { Message } from 'libp2p';
import PeerInfo from 'peer-info';
import PeerId from 'peer-id';
const pull = require('pull-stream');
const Pushable = require('pull-pushable');
import { TransformOptions } from '../type'

export function transformPubsub(context: TypeContext, options: TransformOptions) {
    /** 属性 */
    const propertys = context.getProperty(PubsubMetadataKey) as PubsubPropertyAst[];
    propertys.map(property => transformPubsubProperty(property, context, options))
    /** 方法 */
    const methods = context.getMethod(PubsubMetadataKey) as PubsubMethodAst[];
    methods.map(method => transformPubsubMethod(method, context, options))
}

function transformPubsubProperty(property: PubsubPropertyAst, context: TypeContext, options: TransformOptions) {
    context.instance[property.ast.propertyKey] = options.libp2p.pubsub;
}
function transformPubsubMethod(method: PubsubMethodAst, context: TypeContext, options: TransformOptions) {
    const addon = context.getClass(AddonMetadataKey) as AddonAst;
    const controller = context.getClass(ControllerMetadataKey) as ControllerAst;
    const path = `${addon.path}/${controller.path}/${method.name}`;
    const mth = context.instance[method.ast.propertyKey].bind(context.instance);
    const params = new Array(method.ast.parameterLength);
    const p = Pushable();
    options.libp2p.pubsub.subscribe(path, (msg: Message) => {
        method.parameters.map(par => {
            if (par instanceof ProtocolParameterAst) {
                // 回复
                params[par.ast.parameterIndex] = (path: string, callback?: (err: Error, data: string, conn: (data: string) => any) => any) => {
                    const id = PeerId.createFromB58String(msg.from)
                    const peer = new PeerInfo(id);
                    const p = Pushable();
                    options.libp2p.dialProtocol(peer, path, (err, conn) => {
                        if (err) callback(err, null, null);
                        pull(p, conn);
                        const handler = (data: string) => p.push(data)
                        pull(conn, pull.map((data) => {
                            callback(err, data, handler);
                        }));
                        callback(err, null, handler);
                    });
                }
            }
            else if (par instanceof BodyAst) {
                params[par.ast.parameterIndex] = msg;
            }
            else {
                console.log(`transformProtocolMethod:${path} ${par.ast.metadataKey} parameter not found handler`)
            }
        });
        mth(...params);
    });
}
