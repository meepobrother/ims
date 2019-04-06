import * as common from 'ims-common';
import { Express, Router, NextFunction, Request, Response } from 'express';
import { getConnection, Connection } from 'typeorm'
import { getConfig } from 'ims-common';
import * as core from 'ims-core';
import { Type, TypeContext } from 'ims-decorator';
export function parseRouter(addons: Type<any>[], app: Express, root: string) {
    app.use('/', createAddonsRouter(addons))
}
function createAddonsRouter(addons: Type<any>[]) {
    try {
        const router = Router();
        addons.map(addon => {
            const context = common.visitor.visitType(addon);
            const addonRouter = createAddonRouter(context);
            if (addonRouter) router.use(addonRouter.path, addonRouter.router);
        });
        return router;
    } catch (e) {
        console.log(`createAddonsRouter:${e.message}`)
    }
}

function createAddonRouter(addon: TypeContext) {
    try {
        const addonRouter = Router();
        const addonAst = addon.getClass(core.AddonMetadataKey) as core.AddonAst;
        addonAst.incs.map(inc => {
            const incRouter = createAddonIncRouter(inc);
            if (incRouter) addonRouter.use(incRouter.path, incRouter.router)
        });
        return {
            path: addonAst.path.startsWith('/') ? addonAst.path : `/${addonAst.path}`,
            router: addonRouter
        };
    } catch (e) {
        console.log(`createAddonRouter:${e.message}`)
    }
}

function createAddonIncRouter(inc: TypeContext) {
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
                        conn = getConnection();
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
            router: incRouter
        }
    }
}
