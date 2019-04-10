"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf = require("rimraf");
const webpack = require("webpack");
const ims_webpack_1 = require("ims-webpack");
const path_1 = require("path");
const child_process_1 = require("child_process");
const ims_webpack_admin_1 = require("ims-webpack-admin");
const ims_webpack_mobile_1 = require("ims-webpack-mobile");
const rxjs_1 = require("rxjs");
class ImsWebpacks {
    constructor(context, dev) {
        this.context = context;
        this.dev = false;
        this.$change = new rxjs_1.BehaviorSubject(0);
        this.admin = new ims_webpack_admin_1.ImsWebpackAdmin(context, !!dev);
        this.mobile = new ims_webpack_mobile_1.ImsWebpackMobile(context, !!dev);
        this.dev = !!dev;
    }
    get pkgs() {
        return [this.admin, this.mobile];
    }
    change(file) {
        const work = child_process_1.spawn('yarn', ['ts', path_1.join(__dirname, file)], {
            cwd: process.cwd()
        });
        work.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        work.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        return work;
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
            this.watch();
        }
        else {
            this.build();
        }
    }
    build() {
        const compiler = webpack(this.getConfig());
        compiler.run((err, stats) => {
            if (err)
                console.error(err);
            const res = ims_webpack_1.formatWebpackMessages(stats.toJson());
            res.errors.map(err => console.error(err));
            res.warnings.map(err => console.warn(err));
            this.logSuccess(stats.toJson());
        });
    }
    watch() {
        const compiler = webpack(this.getConfig());
        compiler.watch({}, (err, stats) => {
            if (err)
                console.error(err);
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
