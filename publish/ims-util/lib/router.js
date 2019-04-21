"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsRouter {
    constructor(route) {
        this.route = route;
        this.children = [];
        this.route.routes = this.route.routes || [];
        this.children = this.route.routes.map(route => new ImsRouter(route));
    }
    get(path) {
        if (this.route.path === path)
            return this.route;
        for (let child of this.children) {
            let item = child.get(path);
            if (item)
                return item;
        }
    }
}
exports.ImsRouter = ImsRouter;
