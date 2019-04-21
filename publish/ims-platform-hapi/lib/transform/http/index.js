"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const typeorm_1 = require("../typeorm");
const cli_1 = require("../cli");
function transformHttp(context, server) {
    const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
    addonAst.incs.map(inc => {
        typeorm_1.transformTypeorm(inc);
        cli_1.transformCommand(inc);
        const incAst = inc.getClass(ims_core_1.ControllerMetadataKey);
        if (!!incAst) {
            let incPath = '';
            if (addonAst.path !== '/') {
                incPath = addonAst.path;
            }
            if (incAst.path !== '/') {
                incPath += incAst.path;
            }
            const methods = inc.getMethod();
            methods.map((par) => {
                const params = new Array(par.ast.parameterLength);
                let _routePath = incPath;
                if (par.path !== '/') {
                    _routePath += par.path || `/${par.ast.propertyKey}`;
                }
                const role = inc.get(par.ast.propertyKey);
                if (par instanceof ims_core_1.GetMethodAst) {
                    console.log(`get ${_routePath}`);
                    server.route({
                        path: _routePath,
                        method: 'GET',
                        options: {
                            auth: !!role ? 'jwt' : false
                        },
                        handler: async (req, h, err) => {
                            const { __args } = req.query;
                            __args && __args.map((arg, key) => {
                                params[key] = arg;
                            });
                            par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
                            return await inc.instance[par.ast.propertyKey](...params);
                        }
                    });
                }
                if (par instanceof ims_core_1.PostMethodAst) {
                    console.log(`post ${_routePath}`);
                    server.route({
                        path: _routePath,
                        method: 'POST',
                        options: {
                            auth: !!role ? 'jwt' : false
                        },
                        handler: async (req, h, err) => {
                            const { __args } = req.payload;
                            __args && __args.map((arg, key) => {
                                params[key] = arg;
                            });
                            par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
                            return await inc.instance[par.ast.propertyKey](...params);
                        }
                    });
                }
                if (par instanceof ims_core_1.PatchMethodAst) {
                    console.log(`patch ${_routePath}`);
                    server.route({
                        path: _routePath,
                        method: 'Patch',
                        options: {
                            auth: !!role ? 'jwt' : false
                        },
                        handler: async (req, h, err) => {
                            const { __args } = req.payload;
                            __args && __args.map((arg, key) => {
                                params[key] = arg;
                            });
                            par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
                            return await inc.instance[par.ast.propertyKey](...params);
                        }
                    });
                }
                if (par instanceof ims_core_1.PutMethodAst) {
                    console.log(`put ${_routePath}`);
                    server.route({
                        path: _routePath,
                        method: 'PUT',
                        options: {
                            auth: !!role ? 'jwt' : false
                        },
                        handler: async (req, h, err) => {
                            const { __args } = req.payload;
                            __args && __args.map((arg, key) => {
                                params[key] = arg;
                            });
                            par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
                            return await inc.instance[par.ast.propertyKey](...params);
                        }
                    });
                }
                if (par instanceof ims_core_1.DeleteMethodAst) {
                    console.log(`delete ${_routePath}`);
                    server.route({
                        path: _routePath,
                        method: 'Delete',
                        options: {
                            auth: !!role ? 'jwt' : false
                        },
                        handler: async (req, h, err) => {
                            const { __args } = req.query;
                            __args && __args.map((arg, key) => {
                                params[key] = arg;
                            });
                            par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
                            return await inc.instance[par.ast.propertyKey](...params);
                        }
                    });
                }
                if (par instanceof ims_core_1.HeadMethodAst) {
                    console.log(`head ${_routePath}`);
                    server.route({
                        path: _routePath,
                        method: 'HEAD',
                        options: {
                            auth: !!role ? 'jwt' : false
                        },
                        handler: async (req, h, err) => {
                            const { __args } = req.query;
                            __args && __args.map((arg, key) => {
                                params[key] = arg;
                            });
                            par.parameters.map(par => params[par.ast.parameterIndex] = getParameter(par, req, h));
                            return await inc.instance[par.ast.propertyKey](...params);
                        }
                    });
                }
            });
        }
    });
}
exports.transformHttp = transformHttp;
function getParameter(ast, req, h) {
    if (ast instanceof ims_core_1.ReqAst) {
        return req;
    }
    if (ast instanceof ims_core_1.BodyAst) {
        const def = ast.ast.metadataDef;
        if (def)
            return req.payload[def];
        return req.payload;
    }
    if (ast instanceof ims_core_1.QueryAst) {
        const def = ast.ast.metadataDef;
        if (def)
            return req.query[def];
        return req.query;
    }
    if (ast instanceof ims_core_1.UploadAst) {
        const def = ast.ast.metadataDef;
        if (def)
            return req.payload[def];
        return req.payload;
    }
    if (ast instanceof ims_core_1.ParamsAst) {
        const def = ast.ast.metadataDef;
        if (def)
            return req.params[def];
        return req.payload;
    }
}
