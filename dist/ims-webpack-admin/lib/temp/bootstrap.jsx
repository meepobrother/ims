"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const React = require("react");
const react_dom_1 = require("react-dom");
const ims_util_1 = require("ims-util");
const ims_adminer_1 = require("ims-adminer");
const react_router_dom_1 = require("react-router-dom");
require("ant-design-pro/dist/ant-design-pro.css");
const mobx_react_1 = require("mobx-react");
function createStore(routes) {
    const ObjectStore = {};
    routes.map(route => {
        const { store } = route;
        Object.keys(store).map(key => {
            ObjectStore[key] = store[key](routes);
        });
    });
    return ObjectStore;
}
exports.createStore = createStore;
const ims_adminer_2 = require("ims-adminer");
console.log(React);
async function bootstrap(routes) {
    await ims_util_1.ImsUtil.onInit(routes);
    const store = createStore(routes);
    console.log(store);
    react_dom_1.render(<mobx_react_1.Provider store={store}>
            <react_router_dom_1.BrowserRouter>
                <react_1.Suspense fallback={<ims_adminer_2.Loading></ims_adminer_2.Loading>}>
                    {routes.map((route, key) => {
        const { component: Component, path, exact } = route;
        return <react_router_dom_1.Route key={key} path={path} exact={exact} render={() => {
            if (Component) {
                return <Component route={route}/>;
            }
            else {
                return <ims_adminer_1.ImsRoutes route={route}/>;
            }
        }}/>;
    })}
                </react_1.Suspense>
            </react_router_dom_1.BrowserRouter>
        </mobx_react_1.Provider>, document.getElementById('root'));
}
exports.bootstrap = bootstrap;
