import { makeDecorator } from 'ims-decorator';
import * as k from './keys';
import * as t from './type';
import { NextFunction } from 'express';
export type Next = NextFunction;
export interface Upload {
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
export type Uploads = {
    [fieldname: string]: Upload[]
} | Upload[];

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
interface SessionData {
    [key: string]: any;
    cookie: SessionCookieData;
}
export interface Session extends SessionData {
    id: string;
    regenerate(callback: (err: any) => void): void;
    destroy(callback: (err: any) => void): void;
    reload(callback: (err: any) => void): void;
    save(callback: (err: any) => void): void;
    touch(callback: (err: any) => void): void;
    cookie: SessionCookie;
}
import { Request, ResponseToolkit } from 'hapi'
export type Res = ResponseToolkit;
export interface Req extends Request {
    user: any;
}
export interface Redirect {
    (url: string): void;
    (status: number, url: string): void;
    (url: string, status: number): void;
}
export interface Query {
    [key: string]: any;
}
export interface Body {
    [key: string]: any;
}
export const Addon = makeDecorator<t.AddonOptions>(k.AddonMetadataKey);
export const Controller = makeDecorator<t.ControllerOptions>(k.ControllerMetadataKey);
export const Template = makeDecorator<t.TemplateOptions>(k.TemplateMetadataKey);
export const Typeorm = makeDecorator<t.TypeormOptions>(k.TypeormMetadataKey);
export const Version = makeDecorator<t.VersionOptions>(k.VersionMetadataKey);

export const Body = makeDecorator<t.BodyOptions>(k.BodyMetadataKey);
export const Next = makeDecorator<t.NextOptions>(k.NextMetadataKey);
export const Query = makeDecorator<t.QueryOptions>(k.QueryMetadataKey);
export const Redirect = makeDecorator<t.RedirectOptions>(k.RedirectMetadataKey);
export const Req = makeDecorator<t.ReqOptions>(k.ReqMetadataKey);
export const Res = makeDecorator<t.ResOptions>(k.ResMetadataKey);
export const Session = makeDecorator<t.SessionOptions>(k.SessionMetadataKey);
export const Upload = makeDecorator<t.UploadOptions>(k.UploadMetadataKey);
export const Uploads = makeDecorator<t.UploadsOptions>(k.UploadsMetadataKey);



