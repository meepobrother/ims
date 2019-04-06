"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bootstrap_1 = require("./bootstrap");
const ims_adminer_1 = require("ims-adminer");
require("./app.css");
const react_1 = tslib_1.__importDefault(require("react"));
let routes = [{
        hideChildrenInMenu: false,
        path: "/ims-website/app",
        component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../ims-website/lib/template/app/home/index")))),
        roles: [],
        routes: [],
        exact: false,
    }, {
        hideChildrenInMenu: false,
        path: "/ims-install/app",
        component: react_1.default.lazy(() => Promise.resolve().then(() => tslib_1.__importStar(require("../../../../addons/ims-install/template/admin/install")))),
        roles: [],
        routes: [],
        exact: false,
    }];
ims_adminer_1.store.dispatch({
    type: '__init__',
    payload: {
        routes
    }
});
bootstrap_1.bootstrap(routes);
