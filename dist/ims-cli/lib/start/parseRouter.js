"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common = __importStar(require("ims-common"));
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const ims_common_1 = require("ims-common");
const core = __importStar(require("ims-core"));
function parseRouter(addons, app, node) {
    const router = createAddonsRouter(addons, node);
    console.log(JSON.stringify(router.routes, null, 2));
    app.use('/', router.router);
}
exports.parseRouter = parseRouter;
function createAddonsRouter(addons, node) {
    try {
        const router = express_1.Router();
        const routes = [];
        addons.map(addon => {
            const context = common.visitor.visitType(addon);
            const addonRouter = createAddonRouter(context, node);
            routes.push({
                path: addonRouter.path,
                routes: addonRouter.routes
            });
            if (addonRouter)
                router.use(addonRouter.path, addonRouter.router);
        });
        return { router, routes };
    }
    catch (e) {
        console.log(`createAddonsRouter:${e.message}`);
    }
}
function createAddonRouter(addon, node) {
    try {
        const routes = [];
        const addonRouter = express_1.Router();
        const addonAst = addon.getClass(core.AddonMetadataKey);
        addonAst.incs.map(inc => {
            const incRouter = createAddonIncRouter(inc, node);
            routes.push({
                path: incRouter.path,
                routes: incRouter.routes
            });
            if (incRouter)
                addonRouter.use(incRouter.path, incRouter.router);
        });
        const path = addonAst.path.startsWith('/') ? addonAst.path : `/${addonAst.path}`;
        return {
            path: path,
            router: addonRouter,
            routes: {
                path,
                routes
            }
        };
    }
    catch (e) {
        console.log(`createAddonRouter:${e.message}`);
    }
}
function createAddonIncRouter(inc, node) {
    const routes = [];
    const incRouter = express_1.Router();
    const incAst = inc.getClass(core.ControllerMetadataKey);
    function handlerMethod(methods, method) {
        methods && methods.map(mth => {
            function getRes(...parameters) {
                try {
                    return inc.instance[mth.ast.propertyKey](...parameters);
                }
                catch (e) {
                    throw e;
                }
            }
            function getParams(req, res, next) {
                const params = new Array(mth.ast.parameterLength);
                mth.parameters.map(par => {
                    if (par instanceof core.BodyAst) {
                        const def = par.ast.metadataDef;
                        if (typeof def === 'string') {
                            params[par.ast.parameterIndex] = req.body[def];
                        }
                        else {
                            params[par.ast.parameterIndex] = req.body;
                        }
                    }
                    else if (par instanceof core.ReqAst) {
                        params[par.ast.parameterIndex] = req;
                    }
                    else if (par instanceof core.QueryAst) {
                        const def = par.ast.metadataDef;
                        if (def) {
                            params[par.ast.parameterIndex] = req.query[def];
                        }
                        else {
                            params[par.ast.parameterIndex] = req.query;
                        }
                    }
                    else if (par instanceof core.UploadAst) {
                        params[par.ast.parameterIndex] = req.file;
                    }
                    else if (par instanceof core.UploadsAst) {
                        params[par.ast.parameterIndex] = req.files;
                    }
                    else if (par instanceof core.RedirectAst) {
                        const method = par.getMethod();
                        if (method instanceof core.GetAst) {
                            params[par.ast.parameterIndex] = res.redirect;
                        }
                        else {
                            params[par.ast.parameterIndex] = (redirect) => {
                                return {
                                    name: 'redirect',
                                    redirect
                                };
                            };
                        }
                    }
                    else if (par instanceof core.SessionAst) {
                        params[par.ast.parameterIndex] = req.session;
                    }
                    else if (par instanceof core.NextAst) {
                        params[par.ast.parameterIndex] = next;
                    }
                    else if (par instanceof core.ResAst) {
                        params[par.ast.parameterIndex] = res;
                    }
                    else if (par instanceof core.RenderAst) {
                        params[par.ast.parameterIndex] = res.render;
                    }
                    else if (par instanceof core.P2pParameterAst) {
                        params[par.ast.parameterIndex] = node;
                    }
                    else {
                        throw new Error(`不支持${par.ast.metadataKey}`);
                    }
                });
                return params;
            }
            const handlerResult = async (req, res, next) => {
                try {
                    let result = await getRes(...getParams(req, res, next));
                    if (typeof result === 'object') {
                        res.json(result);
                    }
                    else if (typeof result === 'string') {
                        res.end(result);
                    }
                }
                catch (e) {
                    res.json({
                        name: e.name,
                        code: e.code,
                        message: e.message,
                        data: e.data,
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
            const handlerNotFound = (req, res, next) => {
                res.end(`${method} ${req.baseUrl}`);
            };
            routes.push(`${method}:${mth.path}`);
            switch (method) {
                case 'get':
                    incRouter.get(mth.path, handlerResult, handlerNotFound);
                    break;
                case 'post':
                    incRouter.post(mth.path, handlerResult, handlerNotFound);
                    break;
                case 'options':
                    incRouter.options(mth.path, handlerResult, handlerNotFound);
                    break;
                case 'delete':
                    incRouter.delete(mth.path, handlerResult, handlerNotFound);
                    break;
                case 'head':
                    incRouter.head(mth.path, handlerResult, handlerNotFound);
                    break;
                case 'patch':
                    incRouter.patch(mth.path, handlerResult, handlerNotFound);
                    break;
                case 'put':
                    incRouter.put(mth.path, handlerResult, handlerNotFound);
                    break;
                default:
                    throw new Error('不支持方法${method}');
            }
        });
    }
    function getMethodContext(key) {
        return inc.getMethod(key);
    }
    if (incAst) {
        inc.getProperty(core.EntityRepositoryMetadataKey).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => {
                    const def = _inject.ast.metadataDef;
                    let conn;
                    let config = ims_common_1.getConfig();
                    if (def.db === core.RepositoryType.system && config) {
                        conn = typeorm_1.getConnection(config.system);
                    }
                    else {
                        conn = typeorm_1.getConnection();
                    }
                    return conn.getRepository(def.target);
                }
            });
        });
        inc.getProperty(core.InjectMetadataKey).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => _inject.inject()
            });
        });
        handlerMethod(getMethodContext(core.GetMetadataKey), 'get');
        handlerMethod(getMethodContext(core.PostMetadataKey), 'post');
        handlerMethod(getMethodContext(core.DeleteMetadataKey), 'delete');
        handlerMethod(getMethodContext(core.OptionMetadataKey), 'options');
        handlerMethod(getMethodContext(core.PutMetadataKey), 'put');
        handlerMethod(getMethodContext(core.PatchMetadataKey), 'patch');
        handlerMethod(getMethodContext(core.HeadMetadataKey), 'head');
        return {
            path: incAst.path.startsWith('/') ? incAst.path : `/${incAst.path}`,
            router: incRouter,
            routes: routes
        };
    }
}
