"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const ims_util_1 = require("ims-util");
const routes_1 = require("./routes");
const loading_1 = require("./loading");
const react_router_dom_1 = require("react-router-dom");
require("ant-design-pro/dist/ant-design-pro.css");
const mobx_react_1 = require("mobx-react");
const Authorized_1 = __importDefault(require("ant-design-pro/lib/Authorized"));
const ObjectStore = {};
function createStore(routes) {
    routes.map(route => {
        const { store, routes } = route;
        if (store) {
            Object.keys(store).map(key => {
                if (!!ObjectStore[key]) {
                    console.log(`warning:${key} is exist!!!`);
                }
                else {
                    ObjectStore[key] = new store[key](routes);
                    console.log(`store key: ${key}`);
                }
            });
        }
        if (routes && routes.length > 0) {
            createStore(routes);
        }
    });
    return ObjectStore;
}
exports.createStore = createStore;
function bootstrap(routes) {
    return ims_util_1.ImsUtil.onInit(routes).then(() => {
        const store = createStore(routes);
        const userRole = store.login.role || 'default';
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
            redirectPath: '/403',
            key: router.path,
            path: router.path,
            exact: !!router.exact,
            render: () => {
                if (router.component) {
                    return <React.Suspense fallback={<loading_1.Loading />}>
                        <router.component route={router}/>
                    </React.Suspense>;
                }
                else {
                    return <routes_1.ImsRoutes route={router}/>;
                }
            }
        });
        react_dom_1.render(<mobx_react_1.Provider {...store}>
                <react_router_dom_1.BrowserRouter>
                    {routes.map((route, key) => {
            const props = routerProps(route);
            console.log(props);
            return <AuthorizedRoute {...props}/>;
        })}
                </react_router_dom_1.BrowserRouter>
            </mobx_react_1.Provider>, document.getElementById('root'));
    });
}
exports.bootstrap = bootstrap;
