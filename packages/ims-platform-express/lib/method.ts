import * as common from 'ims-common';
import { Router, Request, Response, NextFunction } from 'express';
import { Connection, getConnection } from 'typeorm';
import * as core from "express-serve-static-core";
import { RepositoryType } from 'ims-common';
let app: core.Express
export default function (context: common.TypeContext, _app: core.Express) {
    app = _app;
    app.use('/', createAppRouter(context))
}
function createAppRouter(app: common.TypeContext): core.Router {
    const appAst = app.getClass(common.AppMetadataKey) as common.AppAst;
    const router = Router();
    if (appAst) {
        appAst.addons.map(addon => {
            const addonRouter = createAddonRouter(addon, app);
            if (addonRouter) router.use(addonRouter.path, addonRouter.router);
        });
    }
    return router;
}
function createAddonRouter(addon: common.TypeContext, app: common.TypeContext) {
    const addonRouter = Router();
    const addonAst = addon.getClass(common.AddonMetadataKey) as common.AddonAst;
    addonAst.incs.map(inc => {
        const incRouter = createAddonIncRouter(inc, addon, app);
        if (incRouter) addonRouter.use(incRouter.path, incRouter.router)
    });
    return {
        path: addonAst.path.startsWith('/') ? addonAst.path : `/${addonAst.path}`,
        router: addonRouter
    };
}

function createAddonIncRouter(inc: common.TypeContext, addon: common.TypeContext, app: common.TypeContext) {
    const incRouter = Router();
    const incAst = inc.getClass(common.ControllerMetadataKey) as common.ControllerAst;
    function handlerMethod(methods: common.HttpMethodContext<any>[], method: 'put' | 'head' | 'patch' | 'delete' | 'get' | 'post' | 'options') {
        methods && methods.map(mth => {
            function getRes(...parameters: any[]) {
                try {
                    return inc.instance[mth.ast.propertyKey](...parameters);
                } catch (e) {
                    throw e;
                }
            }
            function getParams(req: Request, res: Response, next: NextFunction) {
                const params = new Array(mth.ast.parameterLength);
                mth.parameters.map(par => {
                    if (par instanceof common.BodyAst) {
                        const def = par.ast.metadataDef;
                        if (typeof def === 'string') {
                            params[par.ast.parameterIndex] = req.body[def];
                        } else {
                            params[par.ast.parameterIndex] = req.body;
                        }
                    } else if (par instanceof common.ReqAst) {
                        params[par.ast.parameterIndex] = req;
                    } else if (par instanceof common.QueryAst) {
                        const def = par.ast.metadataDef;
                        if (def) {
                            params[par.ast.parameterIndex] = req.query[def];
                        } else {
                            params[par.ast.parameterIndex] = req.query;
                        }
                    }
                    else if (par instanceof common.UploadAst) {
                        params[par.ast.parameterIndex] = (req as any).file
                    }
                    else if (par instanceof common.UploadsAst) {
                        params[par.ast.parameterIndex] = (req as any).files
                    }
                    else if (par instanceof common.RedirectAst) {
                        const method = par.getMethod();
                        if (method instanceof common.GetAst) {
                            params[par.ast.parameterIndex] = res.redirect
                        } else {
                            params[par.ast.parameterIndex] = (redirect: string) => {
                                return {
                                    name: 'redirect',
                                    redirect
                                }
                            }
                        }
                    }
                    else if (par instanceof common.SessionAst) {
                        params[par.ast.parameterIndex] = req.session
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
                        throw new Error(`不支持${par.ast.metadataKey}`)
                    }
                });
                return params;
            }
            const handlerResult = async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await getRes(...getParams(req, res, next));
                    if (typeof result === 'object') {
                        res.json(result)
                    } else if (typeof result === 'string') {
                        res.end(result)
                    }
                } catch (e) {
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
            }
            const handlerNotFound = (req: Request, res, next) => {
                res.end(`${method} ${req.baseUrl}`)
            }
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
                    throw new Error('不支持方法${method}')
            }
        });
    }
    function getMethodContext(key: string): common.HttpMethodContext<any>[] {
        return inc.getMethod(key) as common.HttpMethodContext<any>[]
    }
    if (incAst) {
        const connection: Connection = app.get('typeorm');
        if (connection) {
            (inc.getProperty(common.EntityRepositoryMetadataKey) as common.EntityRepositoryAst[]).map(_inject => {
                Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                    get: () => {
                        const def = _inject.ast.metadataDef;
                        let conn = connection;
                        if (def.db === RepositoryType.addons) {
                            if (def.db) conn = getConnection('ims_system') || connection;
                        }
                        return conn.getRepository(def.target)
                    }
                });
            });
        }
        (inc.getProperty(common.InjectMetadataKey) as common.InjectAst[]).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => _inject.inject()
            })
        });
        (inc.getProperty(common.ServerMetadataKey) as common.ServerAst[]).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => app['ws']
            })
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
        }
    }
}