import { IRouter } from 'ims-core';
import UniversalRouter, { Routes, Context, RouteContext, Params, Route } from 'universal-router';
export interface IRouterProps {
    routes: IRouter[];
}
export { IRouter, Routes, Context, RouteContext, Params, Route };
export declare class ImsRouter<C extends Context = Context, R = any> extends UniversalRouter<C, R> {
    constructor(routes: Routes<C, R>);
}
