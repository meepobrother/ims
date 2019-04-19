import { TypeContext, ParameterContext, } from "ims-decorator";
import {
    AddonMetadataKey, AddonAst, ControllerMetadataKey,
    ControllerAst, HttpMethodContext, GetMethodAst,
    PostMethodAst, PutMethodAst, DeleteMethodAst,
    PatchMethodAst, HeadMethodAst
} from "ims-core";
import { Server, RequestQuery } from 'hapi'
export interface IRequestQuery extends RequestQuery {
    __args?: any[];
}
export function transformHttp(context: TypeContext, server: Server) {
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    addonAst.incs.map(inc => {
        const incAst = inc.getClass(ControllerMetadataKey) as ControllerAst;
        let incPath = '';
        if (addonAst.path !== '/') {
            incPath = addonAst.path;
        }
        if (incAst.path !== '/') {
            incPath += incAst.path;
        }
        inc.getMethod().map((par: HttpMethodContext<any>) => {
            const params = new Array(par.ast.parameterLength);
            let _routePath = incPath;
            if (par.path !== '/') {
                _routePath += par.path;
            }
            if (par instanceof GetMethodAst) {
                server.route({
                    path: _routePath,
                    method: 'GET',
                    handler: async (req, h, err) => {
                        const { __args } = req.query as IRequestQuery;
                        __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        return await inc.instance[par.ast.propertyKey](...params)
                    }
                })
            }
            if (par instanceof PostMethodAst) {
                server.route({
                    path: _routePath,
                    method: 'POST',
                    handler: async (req, h, err) => {
                        const { __args } = req.payload as { __args: any[] };
                        __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        return await inc.instance[par.ast.propertyKey](...params)
                    }
                })
            }
            if (par instanceof PatchMethodAst) {
                server.route({
                    path: _routePath,
                    method: 'Patch',
                    handler: async (req, h, err) => {
                        const { __args } = req.payload as { __args: any[] };
                        __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        return await inc.instance[par.ast.propertyKey](...params)
                    }
                })
            }
            if (par instanceof PutMethodAst) {
                server.route({
                    path: _routePath,
                    method: 'PUT',
                    handler: async (req, h, err) => {
                        const { __args } = req.payload as { __args: any[] };
                        __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        return await inc.instance[par.ast.propertyKey](...params)
                    }
                })
            }
            if (par instanceof DeleteMethodAst) {
                server.route({
                    path: _routePath,
                    method: 'Delete',
                    handler: async (req, h, err) => {
                        const { __args } = req.query as IRequestQuery;
                        __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        return await inc.instance[par.ast.propertyKey](...params)
                    }
                })
            }
            if (par instanceof HeadMethodAst) {
                server.route({
                    path: _routePath,
                    method: 'HEAD',
                    handler: async (req, h, err) => {
                        const { __args } = req.query as IRequestQuery;
                        __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        return await inc.instance[par.ast.propertyKey](...params)
                    }
                })
            }
        });
    });
}

