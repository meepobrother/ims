/// <reference types="node" />
import { TypeContext } from "ims-decorator";
import { TransformOptions } from '../type';
export declare const routerMap: Map<string, any>;
import { ImsCookie } from 'ims-cookie';
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
export default function transform(context: TypeContext, options: TransformOptions): {
    path: string;
    router: import("express-serve-static-core").Router;
};
