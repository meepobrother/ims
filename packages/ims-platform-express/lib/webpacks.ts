import rimraf = require('rimraf');
import webpack = require('webpack')
import { formatWebpackMessages } from 'ims-webpack';
import { TypeContext, AppMetadataKey, AppAst, AddonMetadataKey, AddonAst, TypeormMetadataKey, TypeormAst, ControllerMetadataKey, ControllerAst } from 'ims-common';
import { join } from 'path'
import { spawn, ChildProcess } from 'child_process'
import { ImsWebpackAdmin } from 'ims-webpack-admin';
import { ImsWebpackMobile } from 'ims-webpack-mobile';
import { watch } from 'chokidar';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class ImsWebpacks {
    isRunning: boolean;

    admin: ImsWebpackAdmin;
    mobile: ImsWebpackMobile;

    get pkgs() {
        return [this.admin, this.mobile]
    }
    dev: boolean;

    $change: BehaviorSubject<any> = new BehaviorSubject(0);
    constructor(public context: TypeContext) {
        this.admin = new ImsWebpackAdmin(context);
        this.mobile = new ImsWebpackMobile(context);
        this.admin.$change.pipe(
            debounceTime(1000)
        ).subscribe(() => {
            console.log(`监听到admin文件变更，正在重新打包请稍后。。。`)
            this.change('commands/templateAdmin');
        });
        this.mobile.$change.pipe(
            debounceTime(1000)
        ).subscribe(() => {
            console.log(`监听到mobile文件变更，正在重新打包请稍后。。。`)
            this.change('commands/templateMobile');
        });
        this.$change.pipe(
            debounceTime(1000)
        ).subscribe(() => {
            console.log(`正在重启express应用`)
            if (this.work) this.work.kill();
            this.work = this.change('commands/express')
        });
        const app = context.getClass(AppMetadataKey) as AppAst;

        // 监听
        const sources = new Set();
        app.addons.map(addon => {
            const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
            const typeormAst = addonAst.typeorm.getClass(TypeormMetadataKey) as TypeormAst;
            if (typeormAst.ast.sourceRoot) {
                sources.add(typeormAst.ast.sourceRoot)
            }
            addonAst.incs.map(inc => {
                const ctl = inc.getClass(ControllerMetadataKey) as ControllerAst
                if (ctl.ast.sourceRoot) {
                    sources.add(ctl.ast.sourceRoot)
                }
            })
        });
        if (sources.size > 0) {
            let srcs = [];
            sources.forEach(s => srcs.push(s))
            watch(srcs)
                .on('change', () => {
                    this.$change.next(0)
                }).on('unlink', () => {
                    this.$change.next(0)
                }).on('add', () => {
                    this.$change.next(0)
                });
        }
        this.dev = app.dev;
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
            this.logSuccess(stats.toJson())
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