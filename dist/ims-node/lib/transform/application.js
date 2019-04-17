"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addon_1 = require("./addon");
exports.socketSet = new Set();
const ims_webpack_admin_1 = require("ims-webpack-admin");
const ims_webpack_mobile_1 = require("ims-webpack-mobile");
class ImsApplication {
    constructor(types, options) {
        this.types = types;
        this.options = options;
        this.addons = new Map();
        this.types.map(addon => {
            this.addons.set(addon, new addon_1.ImsAddon(addon, this.options));
        });
        ims_webpack_admin_1.createAdmin(this.types);
        ims_webpack_mobile_1.createMobile(this.types);
        ImsApplication.application = this;
    }
    // 安装
    installAddon(target) {
        this.types.push(target);
        this.addons.set(target, new addon_1.ImsAddon(target, this.options));
        // build template
        ims_webpack_admin_1.createAdmin(this.types);
        ims_webpack_mobile_1.createMobile(this.types);
    }
    // 卸载
    unInstallAddon(target) {
        const addon = this.addons.get(target);
        if (addon) {
            addon.uninstall();
            this.addons.delete(target);
            const index = this.types.indexOf(target);
            this.types.splice(index, 1);
        }
    }
    // 重新安装
    reInstall(target) {
        console.log(`重新安装${target.name}`);
        this.unInstallAddon(target);
        this.installAddon(target);
    }
    // 编译模板
    createTemplate() {
        ims_webpack_admin_1.createAdmin(this.types);
        ims_webpack_mobile_1.createMobile(this.types);
    }
}
exports.ImsApplication = ImsApplication;
