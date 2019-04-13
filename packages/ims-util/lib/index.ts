import { ImsStorage } from './storage';
import { ImsWs } from './ws';
import { ImsHttp } from './http';
import { ImsRouter } from './router';
import { IRouter } from 'ims-core';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ImsCookie } from 'ims-cookie';

Axios.interceptors.request.use((config) => {
    const token = ImsUtil.cookie.get('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export class ImsUtil {
    static storage: ImsStorage;
    static ws: ImsWs;
    static http: AxiosInstance = Axios;
    static router: ImsRouter;
    static cloud: ImsHttp;
    static cookie: ImsCookie = new ImsCookie(document.cookie);
    static createHttp(opt: AxiosRequestConfig) {
        return Axios.create(opt)
    }
    static async onInit(routes: IRouter[]) {
        this.storage = await ImsStorage.create();
        this.ws = await ImsWs.create();
        this.router = new ImsRouter({
            routes: routes
        });
        this.cloud = await ImsHttp.create('http://localhost:8080')
    }
}
export default ImsUtil;