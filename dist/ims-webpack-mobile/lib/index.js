"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_webpack_1 = require("ims-webpack");
const chokidar_1 = require("chokidar");
const ims_common_1 = require("ims-common");
const util_1 = require("./util");
exports.createMobile = util_1.createMobile;
const sources = new Set();
const rxjs_1 = require("rxjs");
const path_1 = require("path");
/**
 * 打包后台页面
 */
class ImsWebpackMobile extends ims_webpack_1.ImsWebpack {
    constructor(context) {
        super('mobile');
        this.context = context;
        this.$change = new rxjs_1.BehaviorSubject(0);
        this.entity.add(util_1.createMobile(this.context));
        const appAst = this.context.getClass(ims_common_1.AppMetadataKey);
        appAst.addons.map(addon => {
            const addonAst = addon.getClass(ims_common_1.AddonMetadataKey);
            const template = addonAst.template;
            if (template) {
                const tmpAst = template.getClass(ims_common_1.TemplateMetadataKey);
                tmpAst.admins.map(admin => {
                    const routerAst = admin.getClass(ims_common_1.RouterMetadataKey);
                    const def = routerAst.ast.metadataDef;
                    if (def && def.sourceRoot)
                        sources.add(def.sourceRoot);
                });
            }
            if (addonAst.ast.sourceRoot)
                sources.add(addonAst.ast.sourceRoot);
        });
        this.dev = appAst.dev;
        if (this.dev) {
            this.config.devtool('source-map');
            this.config.mode('development');
        }
        if (this.dev)
            this.watchFile();
        this.context.set('imsWebpackMobile', this.config.toConfig());
    }
    getHtmlTemplate() {
        return path_1.join(__dirname, 'index.html');
    }
    watchFile() {
        if (sources.size > 0) {
            const strs = [];
            sources.forEach(file => strs.push(`${file}.*`));
            const watcher = chokidar_1.watch(strs);
            watcher.on('add', () => {
                this.$change.next(0);
            });
            watcher.on('change', () => {
                this.$change.next(0);
            });
            watcher.on('unlink', () => {
                this.$change.next(0);
            });
        }
    }
}
exports.ImsWebpackMobile = ImsWebpackMobile;
