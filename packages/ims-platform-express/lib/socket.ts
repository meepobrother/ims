import * as common from 'ims-common';
import WebSocket = require('ws');
import { SocketAst, BodyAst } from 'ims-common';
export function parseSocket(context: common.TypeContext, socket: WebSocket, server: WebSocket.Server) {
    const appAst = context.getClass(common.AppMetadataKey) as common.AppAst;
    const handlerMap: Map<string, any> = new Map();
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(common.AddonMetadataKey) as common.AddonAst;
        addonAst.incs.map(inc => {
            const incAst = inc.getClass(common.ControllerMetadataKey) as common.ControllerAst;
            const ons = inc.getMethod(common.OnMetadataKey) as common.OnAst[];
            ons.map(on => {
                let name: string = '';
                if (incAst.path === '/') {
                    name = `${addonAst.path}/${on.ast.propertyKey as string}`
                } else {
                    name = `${addonAst.path}${incAst.path}/${on.ast.propertyKey as string}`
                }
                const mthd = inc.instance[on.ast.propertyKey].bind(inc.instance);
                const params = new Array(on.ast.parameterLength);
                handlerMap.set(name, (data: any) => {
                    on.parameters.map(par => {
                        if (par instanceof SocketAst) {
                            params[par.ast.parameterIndex] = socket;
                        } else if (par instanceof BodyAst) {
                            const def = par.ast.metadataDef;
                            if (def) {
                                params[par.ast.parameterIndex] = data[def];
                            } else {
                                params[par.ast.parameterIndex] = data;
                            }
                        }
                    });
                    return mthd(...params)
                });
            });
        });
    });
    socket.on('message', (data: string | Buffer | ArrayBuffer | Buffer[]) => {
        try {
            if (Array.isArray(data)) {
                // todo array data
            } else {
                const str = data.toString();
                const { type, payload } = JSON.parse(str);
                handlerMap.get(type)(payload)
            }
        } catch (e) { }
    });
}