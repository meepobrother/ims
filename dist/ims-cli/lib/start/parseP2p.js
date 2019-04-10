"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
function parseP2p(context, node) {
    const appAst = context.getClass(ims_core_1.AppMetadataKey);
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        addonAst.incs.map(inc => {
            const incAst = inc.getClass(ims_core_1.ControllerMetadataKey);
            const p2ps = inc.getMethod(ims_core_1.P2pMetadataKey);
            p2ps.map(p2p => {
                let name = '';
                if (incAst.path === '/') {
                    name = `${addonAst.path}/${p2p.ast.propertyKey}`;
                }
                else {
                    name = `${addonAst.path}${incAst.path}/${p2p.ast.propertyKey}`;
                }
                const mthd = inc.instance[p2p.ast.propertyKey].bind(inc.instance);
                const params = new Array(p2p.ast.parameterLength);
                node.pubsub.subscribe(name, (msg) => {
                    console.log('msg', msg);
                    p2p.parameters.map(par => {
                        if (par instanceof ims_core_1.P2pParameterAst) {
                            params[par.ast.parameterIndex] = node;
                        }
                        else if (par instanceof ims_core_1.BodyAst) {
                            const def = par.ast.metadataDef;
                            if (def) {
                                params[par.ast.parameterIndex] = msg[def];
                            }
                            else {
                                params[par.ast.parameterIndex] = msg;
                            }
                        }
                    });
                    const res = mthd(...params);
                    if (res && typeof mthd === 'object') {
                        if (res.topic && res.data) {
                            node.pubsub.publish(res.topic, Buffer.from(JSON.stringify(res.data)), () => { });
                        }
                    }
                });
            });
        });
    });
}
exports.parseP2p = parseP2p;
