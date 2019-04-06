"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("ims-decorator"), exports);
tslib_1.__exportStar(require("ims-core"), exports);
tslib_1.__exportStar(require("./platform"), exports);
tslib_1.__exportStar(require("./util"), exports);
const visitors_1 = require("./visitors");
const ims_decorator_1 = require("ims-decorator");
exports.visitor = new ims_decorator_1.Visitors([
    new visitors_1.InjectVisitor(),
    new visitors_1.MethodVisitor(),
    new visitors_1.HttpVisitor(),
    new visitors_1.AddonVisitor(),
    new visitors_1.OrmVisitor(),
    new visitors_1.AppVisitor(),
    new visitors_1.CliVisitor(),
    new visitors_1.StoreVisitor(),
    new visitors_1.SocketVisitor()
]);
