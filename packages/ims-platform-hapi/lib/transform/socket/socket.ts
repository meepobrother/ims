import WebSocket from 'ws'
import { TypeContext } from 'ims-decorator';
import http from 'http';
import { SocketMetadataKey, SocketPropertyAst, SocketMethodAst, AddonMetadataKey, AddonAst, ControllerMetadataKey, ControllerAst, BodyAst, SocketParameterAst, ReqAst } from 'ims-core';
interface Handler<T> {
    (ws: WebSocket, req: http.IncomingMessage, payload: T): any;
}
export const handlerMap: Map<string, Handler<any>> = new Map();

export function transformSocket(
    context: TypeContext,
    options: WebSocket.Server
) {
    const propertys = context.getProperty(SocketMetadataKey) as SocketPropertyAst[];
    propertys.map(pro => transformProperty(pro, context, options))
    const methods = context.getMethod(SocketMetadataKey) as SocketMethodAst[];
    methods.map(pro => transformMethod(pro, context))
}

function transformProperty(property: SocketPropertyAst, context: TypeContext, options: WebSocket.Server) {
    context.instance[property.ast.propertyKey] = options;
}

function transformMethod(method: SocketMethodAst, context: TypeContext) {
    const addon = context.getClass(AddonMetadataKey) as AddonAst;
    const controller = context.getClass(ControllerMetadataKey) as ControllerAst;
    const path = `${addon.path}/${controller.path}/${method.name}`;
    const mth = context.instance[method.ast.propertyKey].bind(context.instance);
    const params = new Array(method.ast.parameterLength);
    handlerMap.set(path, (ws, req, data: any) => {
        method.parameters.map(par => {
            if (par instanceof ReqAst) {
                params[par.ast.parameterIndex] = req;
            } else if (par instanceof BodyAst) {
                const def = par.ast.metadataDef;
                if (def) {
                    params[par.ast.parameterIndex] = data[def];
                } else {
                    params[par.ast.parameterIndex] = data;
                }
            } else if (par instanceof SocketParameterAst) {
                params[par.ast.parameterIndex] = ws;
            }
        });
        return mth(...params)
    })
}