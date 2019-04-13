import { TypeContext, PropertyContext, MethodContext, ParameterContext } from "ims-decorator";
import { GetPropertyAst, PostPropertyAst, PutPropertyAst, PatchPropertyAst, DeletePropertyAst, HeadPropertyAst, AllPropertyAst, EntityRepositoryAst, InjectAst, GetMethodAst, PostMetadataKey, PostMethodAst, DeleteMethodAst, AllMethodAst, HeadMethodAst, PatchMethodAst, PutMethodAst, RoleMethodAst, RoleOptions, BodyAst, ReqAst, QueryAst, UploadAst, UploadsAst, RedirectAst, SessionAst, NextAst, ResAst, RenderAst, CookieParameterAst, ControllerMetadataKey, ControllerAst } from "ims-core";
import { Router, Request, Response, NextFunction } from 'express'
import Axios, { AxiosRequestConfig } from 'axios';
import { TransformOptions } from '../type'
import { getConfig } from "ims-common";
export const routerMap: Map<string, any> = new Map();
import { ImsCookie } from 'ims-cookie';
import debug = require('debug');
const httpDebug = debug('transform:http');
declare global {
    namespace Express {
        interface Request {
            file: Multer.File;
            files: {
                [fieldname: string]: Multer.File[];
            } | Multer.File[];
            session?: Session;
            sessionID?: string;
            imsCookie: ImsCookie;
        }

        interface SessionData {
            [key: string]: any;
            cookie: SessionCookieData;
        }

        interface SessionCookieData {
            originalMaxAge: number;
            path: string;
            maxAge: number | null;
            secure?: boolean;
            httpOnly: boolean;
            domain?: string;
            expires: Date | boolean;
            sameSite?: boolean | string;
        }

        interface SessionCookie extends SessionCookieData {
            serialize(name: string, value: string): string;
        }

        interface Session extends SessionData {
            id: string;
            regenerate(callback: (err: any) => void): void;
            destroy(callback: (err: any) => void): void;
            reload(callback: (err: any) => void): void;
            save(callback: (err: any) => void): void;
            touch(callback: (err: any) => void): void;
            cookie: SessionCookie;
        }
        namespace Multer {
            interface File {
                /** Field name specified in the form */
                fieldname: string;
                /** Name of the file on the user's computer */
                originalname: string;
                /** Encoding type of the file */
                encoding: string;
                /** Mime type of the file */
                mimetype: string;
                /** Size of the file in bytes */
                size: number;
                /** The folder to which the file has been saved (DiskStorage) */
                destination: string;
                /** The name of the file within the destination (DiskStorage) */
                filename: string;
                /** Location of the uploaded file (DiskStorage) */
                path: string;
                /** A Buffer of the entire file (MemoryStorage) */
                buffer: Buffer;
            }
        }
    }
}

// controller
export default function transform(context: TypeContext, options: TransformOptions) {
    const incRouter = Router();
    const inc = context.getClass(ControllerMetadataKey) as ControllerAst;
    context.getProperty().map(pro => transformHttpProperty(pro, context, options))
    context.getMethod().map(pro => transformHttpMethod(pro, context, options, incRouter));
    return {
        path: inc.path,
        router: incRouter
    }
}

function transformHttpProperty(pro: PropertyContext<any>, context: TypeContext, options: TransformOptions) {
    if (pro instanceof GetPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config?: AxiosRequestConfig) => Axios.get(def.path, config)
    }
    else if (pro instanceof PostPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (data: any, config?: AxiosRequestConfig) => Axios.post(def.path, data, config)
    }
    else if (pro instanceof PutPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (data: any, config?: AxiosRequestConfig) => Axios.put(def.path, data, config)
    }
    else if (pro instanceof PatchPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (data: any, config?: AxiosRequestConfig) => Axios.patch(def.path, data, config)
    }
    else if (pro instanceof DeletePropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config?: AxiosRequestConfig) => Axios.delete(def.path, config)
    }
    else if (pro instanceof HeadPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config?: AxiosRequestConfig) => Axios.head(def.path, config)
    }
    else if (pro instanceof AllPropertyAst) {
        const def = pro.ast.metadataDef;
        context.instance[pro.ast.propertyKey] = (config: AxiosRequestConfig) => Axios.request({
            url: def.path,
            ...config
        })
    }
    else if (pro instanceof EntityRepositoryAst) {
        const def = pro.ast.metadataDef;
        Reflect.defineProperty(context.instance, pro.ast.propertyKey, {
            get: () => {
                const config = getConfig()
                if (def.db === 'system') {
                    return options.connectionManager.get(config.system).getRepository(def.target)
                } else {
                    return options.connectionManager.get(config.addons).getRepository(def.target)
                }
            }
        })
    }
    else if (pro instanceof InjectAst) {
        Reflect.defineProperty(context.instance, pro.ast.propertyKey, {
            get: () => pro.inject()
        })
    }
}

function transformHttpMethod(pro: MethodContext<any>, context: TypeContext, options: TransformOptions, router: Router) {
    const mth = context.instance[pro.ast.propertyKey].bind(context.instance);
    const params = new Array(pro.ast.parameterLength);
    const role = context.get<Map<PropertyKey, any>>('role')
    const handler = async (req: Request, res: Response, next: NextFunction) => {
        pro.parameters.map(param => params[param.ast.parameterIndex] = transformHttpParameter(param, context, options, req, res, next))
        const result = await mth(...params);
        try {
            if (typeof result !== 'object') {
                res.end(result)
            } else {
                res.json(result)
            }
        } catch (e) {
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
    }
    const propertyKey = pro.ast.propertyKey;
    if (pro instanceof GetMethodAst) {
        httpDebug.log(`registe get path ${pro.path}`)
        if (role.has(propertyKey)) {
            router.get(pro.path, role.get(propertyKey), handler)
        } else {
            router.get(pro.path, handler)
        }
    }
    else if (pro instanceof PostMethodAst) {
        httpDebug.log(`registe post path ${pro.path}`)
        if (role.has(propertyKey)) {
            router.post(pro.path, role.get(propertyKey), handler)
        } else {
            router.post(pro.path, handler)
        }
    }
    else if (pro instanceof DeleteMethodAst) {
        httpDebug.log(`registe delete path ${pro.path}`)
        if (role.has(propertyKey)) {
            router.delete(pro.path, role.get(propertyKey), handler)
        } else {
            router.delete(pro.path, handler)
        }
    }
    else if (pro instanceof AllMethodAst) {
        httpDebug.log(`registe all path ${pro.path}`)
        if (role.has(propertyKey)) {
            router.all(pro.path, role.get(propertyKey), handler)
        } else {
            router.all(pro.path, handler)
        }
    }
    else if (pro instanceof HeadMethodAst) {
        httpDebug.log(`registe head path ${pro.path}`)
        if (role.has(propertyKey)) {
            router.head(pro.path, role.get(propertyKey), handler)
        } else {
            router.head(pro.path, handler)
        }
    }
    else if (pro instanceof PatchMethodAst) {
        httpDebug.log(`registe patch path ${pro.path}`)
        if (role.has(propertyKey)) {
            router.patch(pro.path, role.get(propertyKey), handler)
        } else {
            router.patch(pro.path, handler)
        }
    }
    else if (pro instanceof PutMethodAst) {
        httpDebug.log(`registe put path ${pro.path}`)
        if (role.has(propertyKey)) {
            router.put(pro.path, role.get(propertyKey), handler)
        } else {
            router.put(pro.path, handler)
        }
    }
}

function transformHttpParameter(par: ParameterContext<any>, context: TypeContext, options: TransformOptions, req: Request, res: Response, next: NextFunction) {
    if (par instanceof BodyAst) {
        const def = par.ast.metadataDef;
        if (typeof def === 'string') {
            return req.body[def];
        } else {
            return req.body;
        }
    } else if (par instanceof ReqAst) {
        return req;
    } else if (par instanceof QueryAst) {
        const def = par.ast.metadataDef;
        if (def) {
            return req.query[def];
        } else {
            return req.query;
        }
    }
    else if (par instanceof UploadAst) {
        return (req as any).file
    }
    else if (par instanceof UploadsAst) {
        return (req as any).files
    }
    else if (par instanceof RedirectAst) {
        return res.redirect
    }
    else if (par instanceof SessionAst) {
        return req.session
    }
    else if (par instanceof NextAst) {
        return next;
    }
    else if (par instanceof ResAst) {
        return res;
    }
    else if (par instanceof RenderAst) {
        return res.render;
    }
    else if (par instanceof CookieParameterAst) {
        return req.imsCookie;
    }
}
