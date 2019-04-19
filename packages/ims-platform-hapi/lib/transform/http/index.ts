import { TypeContext, ParameterContext, } from "ims-decorator";
import {
    AddonMetadataKey, AddonAst, ControllerMetadataKey,
    ControllerAst, HttpMethodContext, GetMethodAst,
    PostMethodAst, PutMethodAst, DeleteMethodAst,
    PatchMethodAst, HeadMethodAst, ReqAst, BodyAst, QueryAst, UploadAst, ParamsAst
} from "ims-core";
import { Server, RequestQuery, Request, Lifecycle, HandlerDecorations, ResponseToolkit } from 'hapi'
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
        const methods = inc.getMethod();
        console.log(`methods`, methods.length)
        methods.map((par: HttpMethodContext<any>) => {
            const params = new Array(par.ast.parameterLength);

            let _routePath = incPath;
            if (par.path !== '/') {
                _routePath += par.path;
            }
            console.log(_routePath)
            if (par instanceof GetMethodAst) {
                server.route({
                    path: _routePath,
                    method: 'GET',
                    handler: async (req, h, err) => {
                        const { __args } = req.query as IRequestQuery;
                        __args && __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
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
                        __args && __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
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
                        __args && __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
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
                        __args && __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
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
                        __args && __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
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
                        __args && __args.map((arg, key) => {
                            params[key] = arg;
                        });
                        par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
                        return await inc.instance[par.ast.propertyKey](...params)
                    }
                })
            }
        });
    });
}

function getParameter(ast: ParameterContext<any>, req: Request, h: ResponseToolkit) {
    if (ast instanceof ReqAst) {
        return req;
    }
    if (ast instanceof BodyAst) {
        const def = ast.ast.metadataDef;
        if (def) return (req.payload as object)[def];
        return req.payload;
    }
    if (ast instanceof QueryAst) {
        const def = ast.ast.metadataDef;
        if (def) return (req.query as object)[def];
        return req.query;
    }
    if (ast instanceof UploadAst) {
        const def = ast.ast.metadataDef;
        if (def) return (req.payload as object)[def];
        return req.payload;
    }
    if (ast instanceof ParamsAst) {
        const def = ast.ast.metadataDef;
        if (def) return req.params[def];
        return req.payload;
    }
}