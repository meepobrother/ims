import { ImsWebpack } from 'ims-webpack';
import {
    AddonMetadataKey, AddonAst, TemplateMetadataKey, TemplateAst
} from 'ims-core';
import { createAdmin } from './util';
import { BehaviorSubject } from 'rxjs';
import { join } from 'path';
export { createAdmin };
import { DllReferencePlugin, IgnorePlugin } from 'webpack';
import { visitor } from 'ims-common';
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
    constructor(public addons: string[], dev: boolean = true) {
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
        if (this.dev) {
            this.config.devtool('source-map');
            this.config.mode('development')
        }
        this.config.plugin('reactDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'attachment/template/library/react.manifest.json'))
        }]);
        this.config.plugin('polyfillDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'attachment/template/library/polyfill.manifest.json'))
        }]);
        this.config.plugin('coreDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'attachment/template/library/core.manifest.json'))
        }]);
        this.config.plugin('momentDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'attachment/template/library/moment.manifest.json'))
        }]);
        this.config.plugin('antdDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'attachment/template/library/antd.manifest.json'))
        }]);
        this.config.plugin('bizchartsDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'attachment/template/library/bizcharts.manifest.json'))
        }]);
        this.config.plugin('dataSetDll').use(DllReferencePlugin, [{
            manifest: require(join(root, 'attachment/template/library/dataSet.manifest.json'))
        }]);
        this.entity.add(createAdmin(this.addons));
    }
}
