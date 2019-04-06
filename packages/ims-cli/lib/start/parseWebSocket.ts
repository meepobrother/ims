import * as common from 'ims-common';
import WebSocket = require('ws');
import { TypeContext } from 'ims-decorator'
import { SocketAst, BodyAst, AppMetadataKey, AddonMetadataKey, ControllerMetadataKey, OnMetadataKey, AppAst, AddonAst, ControllerAst, OnAst } from 'ims-core';
export function parseWebSocket(context: TypeContext, socket: WebSocket, server: WebSocket.Server) {
    const appAst = context.getClass(AppMetadataKey) as AppAst;
    const handlerMap: Map<string, any> = new Map();
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
        addonAst.incs.map(inc => {
            const incAst = inc.getClass(ControllerMetadataKey) as ControllerAst;
            const ons = inc.getMethod(OnMetadataKey) as OnAst[];
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