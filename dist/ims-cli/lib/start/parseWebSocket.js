"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
function parseWebSocket(context, socket, server) {
    const appAst = context.getClass(ims_core_1.AppMetadataKey);
    const handlerMap = new Map();
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        addonAst.incs.map(inc => {
            const incAst = inc.getClass(ims_core_1.ControllerMetadataKey);
            const ons = inc.getMethod(ims_core_1.OnMetadataKey);
            ons.map(on => {
                let name = '';
                if (incAst.path === '/') {
                    name = `${addonAst.path}/${on.ast.propertyKey}`;
                }
                else {
                    name = `${addonAst.path}${incAst.path}/${on.ast.propertyKey}`;
                }
                const mthd = inc.instance[on.ast.propertyKey].bind(inc.instance);
                const params = new Array(on.ast.parameterLength);
                handlerMap.set(name, (data) => {
                    on.parameters.map(par => {
                        if (par instanceof ims_core_1.SocketAst) {
                            params[par.ast.parameterIndex] = socket;
                        }
                        else if (par instanceof ims_core_1.BodyAst) {
                            const def = par.ast.metadataDef;
                            if (def) {
                                params[par.ast.parameterIndex] = data[def];
                            }
                            else {
                                params[par.ast.parameterIndex] = data;
                            }
                        }
                    });
                    return mthd(...params);
                });
            });
        });
    });
    socket.on('message', (data) => {
        try {
            if (Array.isArray(data)) {
                // todo array data
            }
            else {
                const str = data.toString();
                const { type, payload } = JSON.parse(str);
                handlerMap.get(type)(payload);
            }
        }
        catch (e) { }
    });
}
exports.parseWebSocket = parseWebSocket;
