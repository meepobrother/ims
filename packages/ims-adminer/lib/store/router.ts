import { observable, action } from 'mobx'
import { IRouter } from 'ims-core';

export class ImsRouter {
    @observable
    routes: IRouter[];
    setRoutes(routes: IRouter[]) {
        this.routes = routes;
    }
}
