import * as common from 'ims-common';
import { Express, Router, NextFunction, Request, Response } from 'express';
import { getConnection, Connection } from 'typeorm'
import { getConfig } from 'ims-common';
import * as core from 'ims-core';
import { Type, TypeContext } from 'ims-decorator';
import Libp2p from 'libp2p';
export function parseRouter(addons: Type<any>[], app: Express, node: Libp2p) {
    const router = createAddonsRouter(addons, node);
    app.use('/', router.router)
}
function createAddonsRouter(addons: Type<any>[], node: Libp2p) {
    try {
        const router = Router();
        const routes = [];
        addons.map(addon => {
            const context = common.visitor.visitType(addon);
            const addonRouter = createAddonRouter(context, node);
            routes.push({
                path: addonRouter.path,
                routes: addonRouter.routes
            })
            if (addonRouter) router.use(addonRouter.path, addonRouter.router);
        });
        return { router, routes };
    } catch (e) {
        console.log(`createAddonsRouter:${e.message}`)
    }
}

function createAddonRouter(addon: TypeContext, node: Libp2p) {
    try {
        const routes = [];
        const addonRouter = Router();
        const addonAst = addon.getClass(core.AddonMetadataKey) as core.AddonAst;
        addonAst.incs.map(inc => {
            const incRouter = createAddonIncRouter(inc, node);
            routes.push({
                path: incRouter.path,
                routes: incRouter.routes
            })
            if (incRouter) addonRouter.use(incRouter.path, incRouter.router)
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
    } catch (e) {
        console.log(`createAddonRouter:${e.message}`)
    }
}

function createAddonIncRouter(inc: TypeContext, node: Libp2p) {
    const routes = [];
    const incRouter = Router();
    const incAst = inc.getClass(core.ControllerMetadataKey) as core.ControllerAst;
    function handlerMethod(methods: core.HttpMethodContext<any>[], method: 'put' | 'head' | 'patch' | 'delete' | 'get' | 'post' | 'options') {
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
                    if (par instanceof core.BodyAst) {
                        const def = par.ast.metadataDef;
                        if (typeof def === 'string') {
                            params[par.ast.parameterIndex] = req.body[def];
                        } else {
                            params[par.ast.parameterIndex] = req.body;
                        }
                    } else if (par instanceof core.ReqAst) {
                        params[par.ast.parameterIndex] = req;
                    } else if (par instanceof core.QueryAst) {
                        const def = par.ast.metadataDef;
                        if (def) {
                            params[par.ast.parameterIndex] = req.query[def];
                        } else {
                            params[par.ast.parameterIndex] = req.query;
                        }
                    }
                    else if (par instanceof core.UploadAst) {
                        params[par.ast.parameterIndex] = (req as any).file
                    }
                    else if (par instanceof core.UploadsAst) {
                        params[par.ast.parameterIndex] = (req as any).files
                    }
                    else if (par instanceof core.RedirectAst) {
                        const method = par.getMethod();
                        if (method instanceof core.GetAst) {
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
                    else if (par instanceof core.SessionAst) {
                        params[par.ast.parameterIndex] = req.session
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
                    else if (par instanceof core.CookieParameterAst) {
                        params[par.ast.parameterIndex] = req.imsCookie;
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
                        name: e.name || 'error',
                        code: e.code || '',
                        message: e.message || '',
                        data: e.data || {},
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
            }
            const handlerNotFound = (req: Request, res, next) => {
                res.end(`${method} ${req.baseUrl}`)
            }
            routes.push(`${method}:${mth.path}`)
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
    function getMethodContext(key: string): core.HttpMethodContext<any>[] {
        return inc.getMethod(key) as core.HttpMethodContext<any>[]
    }
    if (incAst) {
        (inc.getProperty(core.EntityRepositoryMetadataKey) as core.EntityRepositoryAst[]).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => {
                    const def = _inject.ast.metadataDef;
                    let conn: Connection;
                    let config = getConfig()
                    if (def.db === core.RepositoryType.system && config) {
                        conn = getConnection(config.system);
                    } else {
                        conn = getConnection(config.addons);
                    }
                    return conn.getRepository(def.target)
                }
            });
        });
        (inc.getProperty(core.InjectMetadataKey) as core.InjectAst[]).map(_inject => {
            Reflect.defineProperty(inc.instance, _inject.ast.propertyKey, {
                get: () => _inject.inject()
            })
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
        }
    }
}
