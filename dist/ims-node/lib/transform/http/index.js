"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const ims_common_1 = require("ims-common");
exports.routerMap = new Map();
const httpDebug = (msg) => console.log(`transform:http:${msg}`);
// controller
function transform(context, options) {
    const incRouter = express_1.Router();
    const inc = context.getClass(ims_core_1.ControllerMetadataKey);
    context.getProperty().map(pro => {
        transformHttpProperty(pro, context, options);
    });
    context.getMethod().map(pro => {
        transformHttpMethod(pro, context, options, incRouter);
    });
    return {
        path: inc.path,
        router: incRouter
    };
}
exports.default = transform;
function transformHttpProperty(pro, context, options) {
    if (pro instanceof ims_core_1.GetPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config) => axios_1.default.get(def.path, config);
    }
    else if (pro instanceof ims_core_1.PostPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (data, config) => axios_1.default.post(def.path, data, config);
    }
    else if (pro instanceof ims_core_1.PutPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (data, config) => axios_1.default.put(def.path, data, config);
    }
    else if (pro instanceof ims_core_1.PatchPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (data, config) => axios_1.default.patch(def.path, data, config);
    }
    else if (pro instanceof ims_core_1.DeletePropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config) => axios_1.default.delete(def.path, config);
    }
    else if (pro instanceof ims_core_1.HeadPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config) => axios_1.default.head(def.path, config);
    }
    else if (pro instanceof ims_core_1.AllPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config) => axios_1.default.request({
            url: def.path,
            ...config
        });
    }
    else if (pro instanceof ims_core_1.EntityRepositoryAst) {
        const def = pro.ast.metadataDef;
        Reflect.defineProperty(context.instance, pro.ast.propertyKey, {
            get: () => {
                const config = ims_common_1.getConfig();
                if (def.db === 'system') {
                    return options.connectionManager.get(config.system).getRepository(def.target);
                }
                else {
                    return options.connectionManager.get(config.addons).getRepository(def.target);
                }
            }
        });
    }
    else if (pro instanceof ims_core_1.InjectAst) {
        Reflect.defineProperty(context.instance, pro.ast.propertyKey, {
            get: () => pro.inject()
        });
    }
}
function transformHttpMethod(pro, context, options, router) {
    const mth = context.instance[pro.ast.propertyKey].bind(context.instance);
    const params = new Array(pro.ast.parameterLength);
    const role = context.get('role');
    const handler = async (req, res, next) => {
        pro.parameters.map(param => params[param.ast.parameterIndex] = transformHttpParameter(param, context, options, req, res, next));
        try {
            const result = await mth(...params);
            if (typeof result !== 'object') {
                res.end(result);
            }
            else {
                res.json(result);
            }
        }
        catch (e) {
            res.json({
                name: e.name || 'error',
                code: e.code || '',
                message: e.message || '',
                stack: e.stack,
                attr: {
                    query: req.query,
                    body: req.body,
                    file: req.file,
                    files: req.files,
                    path: req.path,
                    params: req.params
                }
            });
        }
    };
    const propertyKey = pro.ast.propertyKey;
    if (pro instanceof ims_core_1.GetMethodAst) {
        httpDebug(`registe get path ${pro.path}`);
        if (role.has(propertyKey)) {
            router.get(pro.path, role.get(propertyKey), handler);
        }
        else {
            router.get(pro.path, handler);
        }
    }
    else if (pro instanceof ims_core_1.PostMethodAst) {
        httpDebug(`registe post path ${pro.path}`);
        if (role.has(propertyKey)) {
            router.post(pro.path, role.get(propertyKey), handler);
        }
        else {
            router.post(pro.path, handler);
        }
    }
    else if (pro instanceof ims_core_1.DeleteMethodAst) {
        httpDebug(`registe delete path ${pro.path}`);
        if (role.has(propertyKey)) {
            router.delete(pro.path, role.get(propertyKey), handler);
        }
        else {
            router.delete(pro.path, handler);
        }
    }
    else if (pro instanceof ims_core_1.AllMethodAst) {
        httpDebug(`registe all path ${pro.path}`);
        if (role.has(propertyKey)) {
            router.all(pro.path, role.get(propertyKey), handler);
        }
        else {
            router.all(pro.path, handler);
        }
    }
    else if (pro instanceof ims_core_1.HeadMethodAst) {
        httpDebug(`registe head path ${pro.path}`);
        if (role.has(propertyKey)) {
            router.head(pro.path, role.get(propertyKey), handler);
        }
        else {
            router.head(pro.path, handler);
        }
    }
    else if (pro instanceof ims_core_1.PatchMethodAst) {
        httpDebug(`registe patch path ${pro.path}`);
        if (role.has(propertyKey)) {
            router.patch(pro.path, role.get(propertyKey), handler);
        }
        else {
            router.patch(pro.path, handler);
        }
    }
    else if (pro instanceof ims_core_1.PutMethodAst) {
        httpDebug(`registe put path ${pro.path}`);
        if (role.has(propertyKey)) {
            router.put(pro.path, role.get(propertyKey), handler);
        }
        else {
            router.put(pro.path, handler);
        }
    }
}
function transformHttpParameter(par, context, options, req, res, next) {
    if (par instanceof ims_core_1.BodyAst) {
        const def = par.ast.metadataDef;
        if (typeof def === 'string') {
            return req.body[def];
        }
        else {
            return req.body;
        }
    }
    else if (par instanceof ims_core_1.ReqAst) {
        return req;
    }
    else if (par instanceof ims_core_1.QueryAst) {
        const def = par.ast.metadataDef;
        if (def) {
            return req.query[def];
        }
        else {
            return req.query;
        }
    }
    else if (par instanceof ims_core_1.UploadAst) {
        return req.file;
    }
    else if (par instanceof ims_core_1.UploadsAst) {
        return req.files;
    }
    else if (par instanceof ims_core_1.RedirectAst) {
        return res.redirect;
    }
    else if (par instanceof ims_core_1.SessionAst) {
        return req.session;
    }
    else if (par instanceof ims_core_1.NextAst) {
        return next;
    }
    else if (par instanceof ims_core_1.ResAst) {
        return res;
    }
    else if (par instanceof ims_core_1.RenderAst) {
        return res.render;
    }
    else if (par instanceof ims_core_1.CookieParameterAst) {
        return req.imsCookie;
    }
}
