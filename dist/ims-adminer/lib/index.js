"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const typeorm_1 = require("./typeorm");
tslib_1.__exportStar(require("./store"), exports);
var react_router_dom_1 = require("react-router-dom");
exports.Link = react_router_dom_1.Link;
exports.Redirect = react_router_dom_1.Redirect;
exports.Switch = react_router_dom_1.Switch;
exports.Route = react_router_dom_1.Route;
tslib_1.__exportStar(require("./routes"), exports);
tslib_1.__exportStar(require("./typeorm"), exports);
let ImsAdmin = class ImsAdmin {
};
ImsAdmin = tslib_1.__decorate([
    ims_core_1.Addon({
        typeorm: typeorm_1.ImsAdminTypeorm,
        sourceRoot: __dirname
    })
], ImsAdmin);
exports.ImsAdmin = ImsAdmin;
