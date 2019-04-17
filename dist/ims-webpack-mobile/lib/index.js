"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_webpack_1 = require("ims-webpack");
const ims_core_1 = require("ims-core");
const util_1 = require("./util");
exports.createMobile = util_1.createMobile;
const sources = new Set();
const rxjs_1 = require("rxjs");
const path_1 = require("path");
const ims_common_1 = require("ims-common");
/**
 * 打包后台页面
 */
class ImsWebpackMobile extends ims_webpack_1.ImsWebpack {
    constructor(addons, dev = true) {
        super('mobile', dev);
        this.addons = addons;
        this.$change = new rxjs_1.BehaviorSubject(0);
        this.dev == !!dev;
        this.entity.add(util_1.createMobile(addons));
        addons.map(addon => {
            const context = ims_common_1.visitor.visitType(addon);
            const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
            const template = addonAst.template;
            if (template) {
                const tmpAst = template.getClass(ims_core_1.TemplateMetadataKey);
                tmpAst.sourceRoot && sources.add(tmpAst.sourceRoot);
            }
        });
        if (this.dev) {
            this.config.devtool('source-map');
            this.config.mode('development');
        }
    }
    getHtmlTemplate() {
        return path_1.join(__dirname, 'index.html');
    }
}
exports.ImsWebpackMobile = ImsWebpackMobile;
