import { ImsStorage } from './storage';
import { ImsWs } from './ws';
import { ImsHttp } from './http';
import { ImsRouter } from './router';
import { IRouter } from 'ims-core';
export declare class ImsUtil {
    static storage: ImsStorage;
    static ws: ImsWs;
    static http: ImsHttp;
    static router: ImsRouter;
    static cloud: ImsHttp;
    static onInit(routes: IRouter[]): Promise<void>;
}
export default ImsUtil;
