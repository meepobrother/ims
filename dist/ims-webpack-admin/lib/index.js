"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_webpack_1 = require("ims-webpack");
const ims_core_1 = require("ims-core");
const util_1 = require("./util");
exports.createAdmin = util_1.createAdmin;
const sources = new Set();
const rxjs_1 = require("rxjs");
const path_1 = require("path");
const webpack_1 = require("webpack");
const ims_common_1 = require("ims-common");
const root = process.cwd();
/**
 * 打包后台页面
 */
class ImsWebpackAdmin extends ims_webpack_1.ImsWebpack {
    constructor(addons, dev = true) {
        super('admin', dev);
        this.addons = addons;
        this.$change = new rxjs_1.BehaviorSubject(0);
        this.dev = !!dev;
        this.options.plugins.push(new webpack_1.IgnorePlugin(/^\.\/locale$/, /moment$/));
        this.onInit();
    }
    getHtmlTemplate() {
        return path_1.join(__dirname, 'index.html');
    }
    onInit() {
        this.addons.map(addon => {
            const context = ims_common_1.visitor.visitType(addon);
            const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
            if (addonAst.ast.sourceRoot) {
                const template = addonAst.template;
                if (template) {
                    const tmpAst = template.getClass(ims_core_1.TemplateMetadataKey);
                    if (tmpAst.sourceRoot)
                        sources.add(tmpAst.sourceRoot);
                }
            }
        });
        if (this.dev) {
            this.config.devtool('source-map');
            this.config.mode('development');
        }
        this.config.plugin('antdDll').use(webpack_1.DllReferencePlugin, [{
                manifest: require(path_1.join(root, 'template/library/antd.manifest.json'))
            }]);
        this.entity.add(util_1.createAdmin(this.addons));
    }
}
exports.ImsWebpackAdmin = ImsWebpackAdmin;
