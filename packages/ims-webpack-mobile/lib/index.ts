import { ImsWebpack } from 'ims-webpack';
import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst, TemplateMetadataKey, TemplateAst } from 'ims-core';
import { Type } from 'ims-decorator'
import { createMobile } from './util';
const sources = new Set();
import { BehaviorSubject } from 'rxjs';
import { join } from 'path';
import { visitor } from 'ims-common';
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
    constructor(public addons: Type<any>[], dev: boolean = true) {
        super('mobile', dev);
        this.dev == !!dev;
        this.entity.add(createMobile(addons));
        addons.map(addon => {
            const context = visitor.visitType(addon)
            const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
            const template = addonAst.template;
            if (template) {
                const tmpAst = template.getClass(TemplateMetadataKey) as TemplateAst;
                tmpAst.sourceRoot && sources.add(tmpAst.sourceRoot)
            }
        });
        if (this.dev) {
            this.config.devtool('source-map');
            this.config.mode('development')
        }
        if (this.dev) this.watchFile()
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
