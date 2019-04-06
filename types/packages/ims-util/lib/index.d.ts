import { ImsStorage } from './storage';
import { ImsWs } from './ws';
import { ImsHttp } from './http';
import { ImsRouter } from './router';
import { IRouter } from 'ims-core';
export declare class ImsUtil {
    storage: ImsStorage;
    ws: ImsWs;
    http: ImsHttp;
    router: ImsRouter;
    onInit(routes: IRouter[]): Promise<void>;
    static instance: ImsUtil;
    static create(routes: IRouter[]): Promise<ImsUtil>;
}
export default function getUtil(): ImsUtil;
