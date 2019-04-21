"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visitors_1 = require("./visitors");
const ims_decorator_1 = require("ims-decorator");
exports.visitor = new ims_decorator_1.Visitors([
    new visitors_1.InjectVisitor(),
    new visitors_1.MethodVisitor(),
    new visitors_1.HttpVisitor(),
    new visitors_1.AddonVisitor(),
    new visitors_1.OrmVisitor(),
    new visitors_1.CliVisitor(),
    new visitors_1.StoreVisitor(),
    new visitors_1.SocketVisitor()
]);
