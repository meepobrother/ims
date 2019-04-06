import { IRouter } from 'ims-core';

export class ImsRouter {
    children: ImsRouter[] = [];
    constructor(public route: IRouter) {
        this.route.routes = this.route.routes || [];
        this.children = this.route.routes.map(route => new ImsRouter(route))
    }
    get(path: string): IRouter {
        if (this.route.path === path) return this.route;
        for (let child of this.children) {
            let item = child.get(path)
            if (item) return item;
        }
    }
}