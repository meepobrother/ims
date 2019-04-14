import { ImsStorage } from './storage';
import { ImsWs } from './ws';
import { ImsRouter } from './router';
import { IRouter } from 'ims-core';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ImsCookie } from 'ims-cookie';
export declare class ImsUtil {
    static storage: ImsStorage;
    static ws: ImsWs;
    static http: AxiosInstance;
    static router: ImsRouter;
    static cookie: ImsCookie;
    static createHttp(opt: AxiosRequestConfig): AxiosInstance;
    static onInit(routes: IRouter[]): Promise<void>;
}
export default ImsUtil;
