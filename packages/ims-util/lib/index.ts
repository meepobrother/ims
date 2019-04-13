import { ImsStorage } from './storage';
import { ImsWs } from './ws';
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

Axios.interceptors.response.use(res => {
    return res;
}, err => {
    if (err.response) {
        switch (err.response.status) {
            case 401:
                ImsUtil.cookie.remove('token');
                break;
            case 404:
                break;
            default:
                console.log(`err.response.status`, err.response.status);
                break;
        }
    }
    return Promise.reject(err.response.data)
})

export class ImsUtil {
    static storage: ImsStorage;
    static ws: ImsWs;
    static http: AxiosInstance = Axios;
    static router: ImsRouter;
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
    }
}
export default ImsUtil;