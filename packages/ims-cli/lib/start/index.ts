import { Command, Option, ParamsAst } from 'ims-core';
import { ImsCommand } from '../command';
import { join } from 'path';
import { StartOptions } from 'pm2'
import fs from 'fs-extra'
import { rmrf, execSync } from 'ims-node';
import { cpus } from 'os';
// 生成watch文件
@Command({
    name: 'start [addon]',
    description: '启动服务或启动某个模块',
    example: {
        command: `ims start ims-demo`,
        description: `开发调试Ims-demo`
    }
})
export class ImsStart extends ImsCommand {
    @Option({
        alias: 'd',
        description: '开发模式'
    })
    dev: boolean = false;

    /** 当前开发模块 */
    addon: string;

    async run() {
        console.log(this.addon)
        const root = process.cwd();
        // await execSync(`pm2 kill`)
        const devApps: StartOptions[] = [];
        if (this.addon) {
            await rmrf(join(root, `config/${this.addon}/pm2`));
            await rmrf(join(root, `data/${this.addon}/logs`));
            fs.ensureDirSync(join(root, `config/${this.addon}/pm2`));
            fs.ensureDirSync(join(root, `data/${this.addon}/logs`));
            devApps.push({
                name: this.addon,
                script: join(__dirname, 'bin', 'api.js'),
                output: join(root, `data/${this.addon}/logs/api.log`),
                error: join(root, `data/${this.addon}/logs/api-error.log`),
                args: [
                    "start",
                    this.addon
                ]
            });
            devApps.push({
                name: `${this.addon}_template`,
                script: join(__dirname, 'bin/template_dev.js'),
                output: join(root, `data/${this.addon}/logs/template_dev.log`),
                error: join(root, `data/${this.addon}/logs/template_dev-error.log`)
            });
            fs.writeFileSync(join(root, `config/${this.addon}/pm2/dev.json`), JSON.stringify(devApps, null, 2));
            await execSync(`pm2 start ${join(root, `config/${this.addon}/pm2/dev.json`)}`)
        }
        // await rmrf(join(root, 'config/pm2'))
        // await rmrf(join(root, 'data/logs'))
        // fs.ensureDirSync(join(root, 'config/pm2'))
        // fs.ensureDirSync(join(root, 'data/logs'))

        // const prodApps: StartOptions[] = [];
        // prodApps.push({
        //     name: 'api',
        //     script: join(__dirname, 'bin/api.js'),
        //     output: join(root, 'data/logs/api.log'),
        //     error: join(root, 'data/logs/api-error.log'),
        //     instances: cpus().length,
        //     exec_mode: '‘cluster’'
        // });
        // fs.writeFileSync(join(root, 'config/pm2/prod.json'), JSON.stringify(prodApps, null, 2));
        // if (this.dev) {
        //     await execSync(`pm2 start ${join(root, 'config/pm2/dev.json')}`)
        //     // await execSync(`node ${join(__dirname, 'bin/template_dev')}`)
        // } else {
        //     await execSync(`pm2 start ${join(root, 'config/pm2/prod.json')}`)
        //     await execSync(`node ${join(__dirname, 'bin/template_prod')}`)
        // }
        // console.log(`服务启动成功`)
    }
}
