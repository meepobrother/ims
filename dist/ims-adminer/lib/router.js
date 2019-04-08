"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const universal_router_1 = tslib_1.__importDefault(require("universal-router"));
class ImsRouter extends universal_router_1.default {
    constructor(routes) {
        super(routes, {
            context: {},
            baseUrl: '/',
            resolveRoute(context, params) {
                console.log(context.route);
                if (context.route && context.route.action) {
                    return context.route.action(context, params);
                }
                return undefined;
            },
            errorHandler(error, context) {
                console.log({
                    error,
                    context
                });
            }
        });
    }
}
exports.ImsRouter = ImsRouter;
