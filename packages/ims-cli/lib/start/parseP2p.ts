import { TypeContext } from "ims-decorator";
import Libp2p, { Message } from 'libp2p'
import {
    AppMetadataKey, AppAst, AddonMetadataKey,
    AddonAst, ControllerMetadataKey, ControllerAst,
    P2pMetadataKey, P2pAst, P2pParameterAst, BodyAst, P2p, P2pPropertyAst
} from "ims-core";
import PeerId from 'peer-id'
import PeerInfo from 'peer-info'
const pull = require('pull-stream')
const Pushable = require('pull-pushable')
const p = Pushable()
export function parseP2p(context: TypeContext, node: Libp2p) {
    const appAst = context.getClass(AppMetadataKey) as AppAst;
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
        addonAst.incs.map(inc => {
            const incAst = inc.getClass(ControllerMetadataKey) as ControllerAst;
            const p2pMethods = inc.getMethod(P2pMetadataKey) as P2pAst[];
            p2pMethods.map(p2p => {
                let name: string = '';
                if (incAst.path === '/') {
                    name = `${addonAst.path}/${p2p.ast.propertyKey as string}`
                } else {
                    name = `${addonAst.path}${incAst.path}/${p2p.ast.propertyKey as string}`
                }
                const mthd = inc.instance[p2p.ast.propertyKey].bind(inc.instance);
                node.pubsub.subscribe(name, (msg: Message) => {
                    const params = new Array(p2p.ast.parameterLength);
                    p2p.parameters.map(par => {
                        if (par instanceof P2pParameterAst) {
                            params[par.ast.parameterIndex] = {
                                reply(protocol: string, data: string) {
                                    const fromPeerId = PeerId.createFromB58String(msg.from);
                                    const peerInfo = new PeerInfo(fromPeerId);
                                    // 告诉来源服务器 我已收到
                                    node.dialProtocol(peerInfo, protocol, (err, conn) => {
                                        pull(
                                            p,
                                            conn
                                        );
                                        p.push(data)
                                    });
                                },
                                broadcast(msg: Buffer) { }
                            };
                        } else if (par instanceof BodyAst) {
                            const def = par.ast.metadataDef;
                            if (typeof def === 'string') {
                                params[par.ast.parameterIndex] = msg[def];
                            } else {
                                params[par.ast.parameterIndex] = msg;
                            }
                        }
                    });
                    mthd(...params);
                });
            })
            const prototypes = inc.getProperty(P2pMetadataKey) as P2pPropertyAst[];
            prototypes.map(p2p => {
                inc.instance[p2p.ast.propertyKey] = node;
            });
        })
    })
}