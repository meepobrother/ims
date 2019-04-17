"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ims_core_1 = require("ims-core");
const ims_common_1 = require("ims-common");
const http_1 = __importDefault(require("./http"));
const role_1 = __importDefault(require("./role"));
const p2p_1 = __importDefault(require("./p2p"));
const socket_1 = __importDefault(require("./socket"));
const template_1 = __importDefault(require("./template"));
class ImsAddon {
    constructor(target, options) {
        this.target = target;
        this.options = options;
        this.uninstalls = [];
        this.router = express_1.Router();
        const addon = ims_common_1.visitor.visitType(target);
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        const incs = addonAst.incs;
        incs.map(inc => {
            this.install(inc);
        });
        options.app.use(addonAst.path, this.router);
        const stack = options.app._router.stack;
        const last = stack[stack.length - 1];
        this.uninstalls.push((options) => {
            const index = options.app._router.stack.indexOf(last);
            options.app._router.stack.splice(index, 1);
        });
        // 解析template
        template_1.default(addon, this.options.app, () => {
            const stack = options.app._router.stack;
            const last = stack[stack.length - 1];
            this.uninstalls.push((options) => {
                const index = options.app._router.stack.indexOf(last);
                console.log({ index });
                options.app._router.stack.splice(index, 1);
            });
        });
    }
    install(inc) {
        // 解析role
        role_1.default(inc, this.options);
        this.uninstalls.push((options) => {
            inc.set('role', new Map());
        });
        // 解析p2p
        p2p_1.default(inc, this.options);
        // 解析socket
        socket_1.default(inc, this.options);
        // 解析http
        const path = http_1.default(inc, this.options);
        this.router.use(path.path, path.router);
        const stack = this.router.stack[this.router.stack.length - 1];
        this.uninstalls.push(options => {
            const index = this.router.stack.indexOf(stack);
            this.router.stack.splice(index, 1);
        });
    }
    uninstall() {
        this.uninstalls.map(uninstall => uninstall(this.options));
    }
}
exports.ImsAddon = ImsAddon;
