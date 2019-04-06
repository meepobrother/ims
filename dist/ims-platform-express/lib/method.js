"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common = tslib_1.__importStar(require("ims-common"));
const express_1 = require("express");
const typeorm_1 = require("typeorm");
let app;
function default_1(context, _app) {
    app = _app;
    app.use('/', createAppRouter(context));
}
exports.default = default_1;
function createAppRouter(app) {
    const appAst = app.getClass(common.AppMetadataKey);
    const router = express_1.Router();
    if (appAst) {
        appAst.addons.map(addon => {
            const addonRouter = createAddonRouter(addon, app);
            if (addonRouter)
                router.use(addonRouter.path, addonRouter.router);
        });
    }
    return router;
}
function createAddonRouter(addon, app) {
    const addonRouter = express_1.Router();
    const addonAst = addon.getClass(common.AddonMetadataKey);
    addonAst.incs.map(inc => {
        const incRouter = createAddonIncRouter(inc, addon, app);
        if (incRouter)
            addonRouter.use(incRouter.path, incRouter.router);
    });
    return {
        path: addonAst.path.startsWith('/') ? addonAst.path : `/${addonAst.path}`,
        router: addonRouter
    };
}
function createAddonIncRouter(inc, addon, app) {
    const incRouter = express_1.Router();
    const incAst = inc.getClass(common.ControllerMetadataKey);
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
                    if (par instanceof common.BodyAst) {
                        const def = par.ast.metadataDef;
                        if (typeof def === 'string') {
                            params[par.ast.parameterIndex] = req.body[def];
                        }
                        else {
                            params[par.ast.parameterIndex] = req.body;
                        }
                    }
                    else if (par instanceof common.ReqAst) {
                        params[par.ast.parameterIndex] = req;
                    }
                    else if (par instanceof common.QueryAst) {
                        const def = par.ast.metadataDef;
                        if (def) {
                            params[par.ast.parameterIndex] = req.query[def];
                        }
                        else {
                            params[par.ast.parameterIndex] = req.query;
                        }
                    }
                    else if (par instanceof common.UploadAst) {
                        params[par.ast.parameterIndex] = req.file;
                    }
                    else if (par instanceof common.UploadsAst) {
                        params[par.ast.parameterIndex] = req.files;
                    }
                    else if (par instanceof common.RedirectAst) {
                        const method = par.getMethod();
                        if (method instanceof common.GetAst) {
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
                    else if (par instanceof common.SessionAst) {
                        params[par.ast.parameterIndex] = req.session;
                    }
                    else if (par instanceof common.NextAst) {
                        params[par.ast.parameterIndex] = next;
                    }
                    else if (par instanceof common.ResAst) {
                        params[par.ast.parameterIndex] = res;
                    }
                    else if (par instanceof common.RenderAst) {
                        params[par.ast.parameterIndex] = res.render;
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
        const connection = app.get('typeorm');
        if (connection) {
            inc.getProperty(common.EntityRepositoryMetadataKey).map(_inject => {
                Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                    get: () => {
                        const def = _inject.ast.metadataDef;
                        let conn = connection;
                        if (def.db)
                            conn = typeorm_1.getConnection(def.db) || connection;
                        return conn.getRepository(def.target);
                    }
                });
            });
        }
        inc.getProperty(common.InjectMetadataKey).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => _inject.inject()
            });
        });
        inc.getProperty(common.ServerMetadataKey).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => app['ws']
            });
        });
        handlerMethod(getMethodContext(common.GetMetadataKey), 'get');
        handlerMethod(getMethodContext(common.PostMetadataKey), 'post');
        handlerMethod(getMethodContext(common.DeleteMetadataKey), 'delete');
        handlerMethod(getMethodContext(common.OptionMetadataKey), 'options');
        handlerMethod(getMethodContext(common.PutMetadataKey), 'put');
        handlerMethod(getMethodContext(common.PatchMetadataKey), 'patch');
        handlerMethod(getMethodContext(common.HeadMetadataKey), 'head');
        return {
            path: incAst.path.startsWith('/') ? incAst.path : `/${incAst.path}`,
            router: incRouter
        };
    }
}
