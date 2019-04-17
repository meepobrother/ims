"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf = require("rimraf");
const webpack = require("webpack");
const ims_webpack_1 = require("ims-webpack");
const ims_webpack_admin_1 = require("ims-webpack-admin");
const ims_webpack_mobile_1 = require("ims-webpack-mobile");
class ImsWebpacks {
    constructor(addons, dev) {
        this.addons = addons;
        this.dev = false;
        this.dev = dev;
        this.admin = new ims_webpack_admin_1.ImsWebpackAdmin(addons, this.dev);
        this.mobile = new ims_webpack_mobile_1.ImsWebpackMobile(addons, this.dev);
    }
    get pkgs() {
        return [this.admin, this.mobile];
    }
    getConfig() {
        return this.pkgs.map(pkg => {
            const cfg = pkg.toConfig();
            rimraf(cfg.output.path, () => { });
            return cfg;
        });
    }
    run() {
        if (this.dev) {
            return this.watch();
        }
        else {
            return this.build();
        }
    }
    build() {
        const compiler = webpack(this.getConfig());
        compiler.run((err, stats) => {
            if (err)
                console.error(err);
            console.log(`build template!`);
            const res = ims_webpack_1.formatWebpackMessages(stats.toJson());
            res.errors.map(err => console.error(err));
            res.warnings.map(err => console.warn(err));
            this.logSuccess(stats.toJson());
            process.exit();
        });
    }
    watch() {
        const compiler = webpack(this.getConfig());
        compiler.watch({}, (err, stats) => {
            // if (err) console.error(err);
            const res = ims_webpack_1.formatWebpackMessages(stats.toJson());
            res.errors.map(err => console.error(err));
            res.warnings.map(err => console.warn(err));
            this.logSuccess(stats.toJson());
        });
    }
    logSuccess(json) {
        json.children.map(child => {
            console.log(`构建成功: ${child.builtAt}\n`);
        });
    }
}
exports.ImsWebpacks = ImsWebpacks;
