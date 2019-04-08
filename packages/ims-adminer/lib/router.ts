import { IRouter } from 'ims-core'
import UniversalRouter, { Routes, Context, RouteContext, Params, Route } from 'universal-router';
export interface IRouterProps {
    routes: IRouter[];
}
export { IRouter, Routes, Context, RouteContext, Params, Route }

export class ImsRouter<C extends Context = Context, R = any> extends UniversalRouter<C, R> {
    constructor(routes: Routes<C, R>) {
        super(routes, {
            context: {} as C,
            baseUrl: '/',
            resolveRoute(context: C & RouteContext<C, R>, params: Params) {
                console.log(context.route)
                if (context.route && context.route.action) {
                    return context.route.action(context, params)
                }
                return undefined;
            },
            errorHandler(error: Error & { status?: number }, context: C & RouteContext<C, R>) {
                console.log({
                    error,
                    context
                })
            }
        });
    }
}