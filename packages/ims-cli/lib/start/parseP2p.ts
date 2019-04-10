import { TypeContext } from "ims-decorator";
import Libp2p, { Message } from 'libp2p'
import {
    AppMetadataKey, AppAst, AddonMetadataKey,
    AddonAst, ControllerMetadataKey, ControllerAst,
    P2pMetadataKey, P2pAst, P2pParameterAst, BodyAst, P2p
} from "ims-core";
export function parseP2p(context: TypeContext, node: Libp2p) {
    const appAst = context.getClass(AppMetadataKey) as AppAst;
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
        addonAst.incs.map(inc => {
            const incAst = inc.getClass(ControllerMetadataKey) as ControllerAst;
            const p2ps = inc.getMethod(P2pMetadataKey) as P2pAst[];
            p2ps.map(p2p => {
                let name: string = '';
                if (incAst.path === '/') {
                    name = `${addonAst.path}/${p2p.ast.propertyKey as string}`
                } else {
                    name = `${addonAst.path}${incAst.path}/${p2p.ast.propertyKey as string}`
                }
                const mthd = inc.instance[p2p.ast.propertyKey].bind(inc.instance);
                const params = new Array(p2p.ast.parameterLength);
                node.pubsub.subscribe(name, (msg: Message) => {
                    console.log('msg', msg)
                    p2p.parameters.map(par => {
                        if (par instanceof P2pParameterAst) {
                            params[par.ast.parameterIndex] = node;
                        } else if (par instanceof BodyAst) {
                            const def = par.ast.metadataDef;
                            if (def) {
                                params[par.ast.parameterIndex] = msg[def];
                            } else {
                                params[par.ast.parameterIndex] = msg;
                            }
                        }
                    });
                    const res: P2p = mthd(...params);
                    if (res && typeof mthd === 'object') {
                        if (res.topic && res.data) {
                            node.pubsub.publish(res.topic, Buffer.from(JSON.stringify(res.data)), () => { })
                        }
                    }
                })
            })
        })
    })
}