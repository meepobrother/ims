"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
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
            ObjectStore[key] = new store[key](routes);
        });
    });
    return ObjectStore;
}
exports.createStore = createStore;
async function bootstrap(routes) {
    await ims_util_1.ImsUtil.onInit(routes);
    const store = createStore(routes);
    react_dom_1.render(<mobx_react_1.Provider {...store}>
            <react_router_dom_1.BrowserRouter>
                <react_1.Suspense fallback={<ims_adminer_1.Loading></ims_adminer_1.Loading>}>
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
