"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf = require("rimraf");
const webpack = require("webpack");
const ims_webpack_1 = require("ims-webpack");
const ims_common_1 = require("ims-common");
const path_1 = require("path");
const child_process_1 = require("child_process");
const ims_webpack_admin_1 = require("ims-webpack-admin");
const ims_webpack_mobile_1 = require("ims-webpack-mobile");
const chokidar_1 = require("chokidar");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ImsWebpacks {
    constructor(context) {
        this.context = context;
        this.$change = new rxjs_1.BehaviorSubject(0);
        this.admin = new ims_webpack_admin_1.ImsWebpackAdmin(context);
        this.mobile = new ims_webpack_mobile_1.ImsWebpackMobile(context);
        this.admin.$change.pipe(operators_1.debounceTime(1000)).subscribe(() => {
            console.log(`监听到admin文件变更，正在重新打包请稍后。。。`);
            this.change('commands/templateAdmin');
        });
        this.mobile.$change.pipe(operators_1.debounceTime(1000)).subscribe(() => {
            console.log(`监听到mobile文件变更，正在重新打包请稍后。。。`);
            this.change('commands/templateMobile');
        });
        this.$change.pipe(operators_1.debounceTime(1000)).subscribe(() => {
            console.log(`正在重启express应用`);
            if (this.work)
                this.work.kill();
            this.work = this.change('commands/express');
        });
        const app = context.getClass(ims_common_1.AppMetadataKey);
        // 监听
        const sources = new Set();
        app.addons.map(addon => {
            const addonAst = addon.getClass(ims_common_1.AddonMetadataKey);
            const typeormAst = addonAst.typeorm.getClass(ims_common_1.TypeormMetadataKey);
            if (typeormAst.ast.sourceRoot) {
                sources.add(typeormAst.ast.sourceRoot);
            }
            addonAst.incs.map(inc => {
                const ctl = inc.getClass(ims_common_1.ControllerMetadataKey);
                if (ctl.ast.sourceRoot) {
                    sources.add(ctl.ast.sourceRoot);
                }
            });
        });
        if (sources.size > 0) {
            let srcs = [];
            sources.forEach(s => srcs.push(s));
            chokidar_1.watch(srcs)
                .on('change', () => {
                this.$change.next(0);
            }).on('unlink', () => {
                this.$change.next(0);
            }).on('add', () => {
                this.$change.next(0);
            });
        }
        this.dev = app.dev;
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
