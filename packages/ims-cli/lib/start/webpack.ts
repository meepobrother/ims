import rimraf = require('rimraf');
import webpack = require('webpack')
import { formatWebpackMessages } from 'ims-webpack';
import { TypeContext } from 'ims-decorator';
import { join } from 'path'
import { spawn, ChildProcess } from 'child_process'
import { ImsWebpackAdmin } from 'ims-webpack-admin';
import { ImsWebpackMobile } from 'ims-webpack-mobile';
import { BehaviorSubject } from 'rxjs';

export class ImsWebpacks {
    isRunning: boolean;

    admin: ImsWebpackAdmin;
    mobile: ImsWebpackMobile;

    get pkgs() {
        return [this.admin, this.mobile]
    }
    dev: boolean = false;
    $change: BehaviorSubject<any> = new BehaviorSubject(0);
    constructor(public context: TypeContext, dev: boolean) {
        this.admin = new ImsWebpackAdmin(context, !!dev);
        this.mobile = new ImsWebpackMobile(context, !!dev);
        this.dev = !!dev;
    }
    work: ChildProcess;
    change(file: string) {
        const work = spawn('yarn', ['ts', join(__dirname, file)], {
            cwd: process.cwd()
        });
        work.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        work.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        return work
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
            this.watch();
        } else {
            this.build();
        }
    }

    build() {
        const compiler = webpack(this.getConfig());
        compiler.run((err, stats) => {
            if (err) console.error(err);
            const res = formatWebpackMessages(stats.toJson());
            res.errors.map(err => console.error(err));
            res.warnings.map(err => console.warn(err));
            this.logSuccess(stats.toJson());
            process.emit('message', {}, 1)
        });
    }

    watch() {
        const compiler = webpack(this.getConfig())
        compiler.watch({}, (err, stats) => {
            if (err) console.error(err);
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