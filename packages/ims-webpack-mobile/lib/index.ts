import { ImsWebpack } from 'ims-webpack';
import { watch } from 'chokidar';
import { AppMetadataKey, AppAst, AddonMetadataKey, AddonAst, TemplateMetadataKey, RouterMetadataKey, TemplateAst, RouterAst } from 'ims-core';
import { TypeContext } from 'ims-decorator'
import { createMobile } from './util';
const sources = new Set();
import { BehaviorSubject } from 'rxjs';
import { join } from 'path';
export { createMobile };
/**
 * 打包后台页面
 */
export class ImsWebpackMobile extends ImsWebpack {
    /**
     * 是否开发中
     */
    dev: boolean;
    $change: BehaviorSubject<any> = new BehaviorSubject(0);
    isRunning: boolean;
    constructor(public context: TypeContext, dev: boolean = true) {
        super('mobile');
        this.dev == !!dev;
        this.entity.add(createMobile(this.context));
        const appAst = this.context.getClass(AppMetadataKey) as AppAst;
        appAst.addons.map(addon => {
            const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
            const template = addonAst.template;
            if (template) {
                const tmpAst = template.getClass(TemplateMetadataKey) as TemplateAst;
                tmpAst.admins.map(admin => {
                    const routerAst = admin.getClass(RouterMetadataKey) as RouterAst;
                    const def = routerAst.ast.metadataDef;
                    if (def && def.sourceRoot) sources.add(def.sourceRoot);
                });
            }
            if (addonAst.ast.sourceRoot) sources.add(addonAst.ast.sourceRoot)
        });
        if (this.dev) {
            this.config.devtool('source-map');
            this.config.mode('development')
        }
        if (this.dev) this.watchFile()
        this.context.set('imsWebpackMobile', this.config.toConfig())
    }

    getHtmlTemplate() {
        return join(__dirname, 'index.html')
    }

    watchFile() {
        if (sources.size > 0) {
            const strs = [];
            sources.forEach(file => strs.push(`${file}.*`))
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
