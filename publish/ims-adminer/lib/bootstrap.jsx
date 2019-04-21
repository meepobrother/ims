"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const ims_util_1 = require("ims-util");
const routes_1 = require("./routes");
const loading_1 = require("./loading");
const react_router_dom_1 = require("react-router-dom");
require("ant-design-pro/dist/ant-design-pro.css");
const mobx_react_1 = require("mobx-react");
const Authorized_1 = __importDefault(require("ant-design-pro/lib/Authorized"));
const history_1 = require("./history");
const store_1 = require("./store");
async function bootstrap(routes) {
    await ims_util_1.ImsUtil.onInit(routes);
    await store_1.role.autoLogin();
    react_dom_1.render(<mobx_react_1.Provider role={store_1.role}>
        <AdminerRouter routes={routes}/>
    </mobx_react_1.Provider>, document.getElementById('root'));
}
exports.bootstrap = bootstrap;
const mobx_react_2 = require("mobx-react");
let AdminerRouter = class AdminerRouter extends react_1.default.Component {
    render() {
        return <react_router_dom_1.Router history={history_1.history}>
            {this.props.routes.map((route, key) => {
            const userRole = this.props.role.role || 'default';
            const AuthorizedRoute = Authorized_1.default(userRole).AuthorizedRoute;
            const routerProps = (router) => ({
                authority: role => {
                    if (!router.roles)
                        return true;
                    if (router.roles.length === 0)
                        return true;
                    if (role === 'admin')
                        return true;
                    return router.roles.indexOf(role) > -1;
                },
                redirectPath: '/error/403',
                key: router.path,
                path: router.path,
                exact: !!router.exact,
                render: () => {
                    if (router.component) {
                        return <react_1.default.Suspense fallback={<loading_1.Loading />}>
                                <router.component route={router}/>
                            </react_1.default.Suspense>;
                    }
                    else {
                        return <routes_1.ImsRoutes route={router}/>;
                    }
                }
            });
            const props = routerProps(route);
            if (route.store) {
                return <mobx_react_1.Provider role={store_1.role} {...route.store}>
                        <AuthorizedRoute {...props}/>
                    </mobx_react_1.Provider>;
            }
            else {
                return <AuthorizedRoute {...props}/>;
            }
        })}
        </react_router_dom_1.Router>;
    }
};
AdminerRouter = __decorate([
    mobx_react_2.inject('role'),
    mobx_react_2.observer
], AdminerRouter);
exports.AdminerRouter = AdminerRouter;
