"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bootstrap_1 = require("./bootstrap");
const ims_adminer_1 = require("ims-adminer");
require("./app.css");
const react_1 = tslib_1.__importDefault(require("react"));
let routes = [{
        path: "/ims-website",
        name: "官网",
        roles: [],
        routes: [{
                path: "/ims-website/home",
                component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/web/pages/index")))),
                name: "首页",
                roles: [],
                routes: [],
            }, {
                path: "/ims-website/goods",
                component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/web/pages/news/index")))),
                name: "产品",
                roles: [],
                routes: [],
            }, {
                path: "/ims-website/news",
                component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/web/pages/news")))),
                name: "动态",
                roles: [],
                routes: [],
            }, {
                path: "/ims-website/shoper",
                component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/web/pages/news")))),
                name: "应用市场",
                roles: [],
                routes: [],
            }, {
                path: "/ims-website/develementor",
                component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/web/pages/news")))),
                name: "开发者中心",
                roles: [],
                routes: [],
            }, {
                path: "/ims-website/login",
                component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/web/pages/news")))),
                name: "登录",
                roles: [],
                routes: [],
            }, {
                path: "/ims-website/register",
                component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/web/pages/news")))),
                name: "注册",
                roles: [],
                routes: [],
            }],
        icon: "/ims-website/home",
        exact: true,
    }, {
        path: "/ims-website/app",
        component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/app/home/index")))),
        roles: [],
        routes: [],
    }, {
        path: "/ims-install",
        component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../../addons/ims-install/template/admin/install")))),
        roles: [],
        routes: [],
    }, {
        path: "/ims-install/app",
        component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../../addons/ims-install/template/admin/install")))),
        roles: [],
        routes: [],
    }];
ims_adminer_1.store.dispatch({
    type: '__init__',
    payload: {
        routes
    }
});
bootstrap_1.bootstrap(routes);
