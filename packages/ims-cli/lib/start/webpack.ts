import rimraf = require('rimraf');
import webpack = require('webpack')
import { formatWebpackMessages } from 'ims-webpack';
import { Type } from 'ims-decorator';
import { ImsWebpackAdmin } from 'ims-webpack-admin';
import { ImsWebpackMobile } from 'ims-webpack-mobile';

export class ImsWebpacks {
    isRunning: boolean;

    admin: ImsWebpackAdmin;
    mobile: ImsWebpackMobile;

    get pkgs() {
        return [this.admin, this.mobile]
    }
    dev: boolean = false;
    constructor(public addons: Type<any>[], dev: boolean) {
        this.dev = dev;
        this.admin = new ImsWebpackAdmin(addons, this.dev);
        this.mobile = new ImsWebpackMobile(addons, this.dev);
    }
    getConfig(): webpack.Configuration[] {
        return this.pkgs.map(pkg => {
            const cfg = pkg.toConfig();
            rimraf(cfg.output.path, () => { })
            return cfg;
        });
    }
    run() {
        if (this.dev) {
            return this.watch();
        } else {
            return this.build();
        }
    }
    build() {
        const compiler = webpack(this.getConfig());
        compiler.run((err, stats) => {
            if (err) console.error(err);
            console.log(`build template!`)
            const res = formatWebpackMessages(stats.toJson());
            res.errors.map(err => console.error(err));
            res.warnings.map(err => console.warn(err));
            this.logSuccess(stats.toJson());
            process.exit();
        });
    }

    watch() {
        const compiler = webpack(this.getConfig())
        compiler.watch({}, (err, stats) => {
            // if (err) console.error(err);
            const res = formatWebpackMessages(stats.toJson());
            res.errors.map(err => console.error(err));
            res.warnings.map(err => console.warn(err));
            this.logSuccess(stats.toJson())
        });
    }

    logSuccess(json: {
        children: {
            assets: any[];
            assetsByChunkName: any;
            builtAt: number;
            children: any[];
            chunks: any[];
            entrypoints: any;
        }[],
        hash: string;
        version: string;
    }) {
        json.children.map(child => {
            console.log(`构建成功: ${child.builtAt}\n`);
        });
    }
}