"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
exports.handlerMap = new Map();
function transformSocket(context, options) {
    const propertys = context.getProperty(ims_core_1.SocketMetadataKey);
    propertys.map(pro => transformProperty(pro, context, options));
    const methods = context.getMethod(ims_core_1.SocketMetadataKey);
    methods.map(pro => transformMethod(pro, context));
}
exports.transformSocket = transformSocket;
function transformProperty(property, context, options) {
    context.instance[property.ast.propertyKey] = options.server;
}
function transformMethod(method, context) {
    const addon = context.getClass(ims_core_1.AddonMetadataKey);
    const controller = context.getClass(ims_core_1.ControllerMetadataKey);
    const path = `${addon.path}/${controller.path}/${method.name}`;
    const mth = context.instance[method.ast.propertyKey].bind(context.instance);
    const params = new Array(method.ast.parameterLength);
    exports.handlerMap.set(path, (ws, req, data) => {
        method.parameters.map(par => {
            if (par instanceof ims_core_1.ReqAst) {
                params[par.ast.parameterIndex] = req;
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
            else if (par instanceof ims_core_1.SocketParameterAst) {
                params[par.ast.parameterIndex] = ws;
            }
        });
        return mth(...params);
    });
}
