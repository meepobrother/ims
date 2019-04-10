import { ImsWebpack } from 'ims-webpack';
import { watch } from 'chokidar';
import {
    AppMetadataKey, AppAst, AddonMetadataKey, AddonAst, TemplateMetadataKey, TemplateAst, RouterMetadataKey, RouterAst
} from 'ims-core';
import { TypeContext } from 'ims-decorator'
import { createAdmin } from './util';
const sources = new Set();
import { BehaviorSubject } from 'rxjs';
import { join } from 'path';
export { createAdmin };
import { DllReferencePlugin, IgnorePlugin } from 'webpack';
const root = process.cwd();
/**
 * 打包后台页面
 */
export class ImsWebpackAdmin extends ImsWebpack {
    /**
     * 是否开发中
     */
    dev: boolean;
    $change: BehaviorSubject<any> = new BehaviorSubject(0);
    isRunning: boolean;
    constructor(public context: TypeContext, dev: boolean = true) {
        super('admin', dev);
        this.dev = !!dev;
        this.options.plugins.push(
            new IgnorePlugin(/^\.\/locale$/, /moment$/)
        );
        this.onInit();
    }

    getHtmlTemplate() {
        return join(__dirname, 'index.html')
    }

    onInit() {
        const appAst = this.context.getClass(AppMetadataKey) as AppAst;
        appAst.addons.map(addon => {
            const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
            if (addonAst.ast.sourceRoot) {
                const template = addonAst.template;
                if (template) {
                    const tmpAst = template.getClass(TemplateMetadataKey) as TemplateAst;
                    if (tmpAst.sourceRoot) sources.add(tmpAst.sourceRoot);
                }
            }
        });
        if (this.dev) {
            this.config.devtool('source-map');
            this.config.mode('development')
        }
        this.config.plugin('antdDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'template/library/antd.manifest.json'))
        }]);
        this.entity.add(createAdmin(this.context));
        if (this.dev) this.watchFile();
        this.context.set('imsWebpackAdmin', this.config.toConfig())
    }

    watchFile() {
        if (sources.size > 0) {
            const strs = [];
            sources.forEach(file => strs.push(`${file}`));
            const watcher = watch(strs);
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
