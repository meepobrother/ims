import { ImsStorage } from './storage';
import { ImsWs } from './ws';
import { ImsHttp } from './http';
import { ImsRouter } from './router';
import { IRouter } from 'ims-core';
export class ImsUtil {
    static storage: ImsStorage;
    static ws: ImsWs;
    static http: ImsHttp;
    static router: ImsRouter;
    static cloud: ImsHttp;
    static async onInit(routes: IRouter[]) {
        this.storage = await ImsStorage.create();
        this.ws = await ImsWs.create();
        this.http = await ImsHttp.create();
        this.router = new ImsRouter({
            routes: routes
        });
        this.cloud = await ImsHttp.create('http://localhost:8080')
    }
}
export default ImsUtil;