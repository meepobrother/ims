"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_dom_1 = require("react-dom");
const ims_util_1 = require("ims-util");
const ims_adminer_1 = require("ims-adminer");
const react_router_dom_1 = require("react-router-dom");
async function bootstrap(routes) {
    await ims_util_1.ImsUtil.onInit(routes);
    react_dom_1.render(<react_router_dom_1.BrowserRouter>
            <react_1.Suspense fallback={fallback()}>
                <react_router_dom_1.Switch>
                    {routes.map((route, key) => {
        const { component: Component, path, extra } = route;
        return <react_router_dom_1.Route key={key} path={path} extra={extra} render={() => {
            if (Component) {
                return <Component route={route}/>;
            }
            else {
                return <ims_adminer_1.ImsRoutes route={route}/>;
            }
        }}/>;
    })}
                    <react_router_dom_1.Route render={() => <div>404</div>}/>
                </react_router_dom_1.Switch>
            </react_1.Suspense>
        </react_router_dom_1.BrowserRouter>, document.getElementById('root'));
}
exports.bootstrap = bootstrap;
console.log(bootstrap.apply);
function fallback() {
    return <div></div>;
}
