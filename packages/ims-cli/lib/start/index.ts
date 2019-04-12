import { Command, Input } from 'ims-core';
import { ImsCommand } from '../command';
import { join } from 'path';
import { StartOptions } from 'pm2'
import fs from 'fs-extra'
import { rmrf, execSync } from 'ims-node';
import { cpus } from 'os';
// 生成watch文件
@Command({
    name: 'start'
})
export class ImsStart extends ImsCommand {
    @Input({
        alis: 'd'
    })
    dev: boolean = false;

    async run() {
        const root = process.cwd();
        await execSync(`pm2 kill`)
        const devApps: StartOptions[] = [];
        await rmrf(join(root, 'config/pm2'))
        await rmrf(join(root, 'data/logs'))
        fs.ensureDirSync(join(root, 'config/pm2'))
        fs.ensureDirSync(join(root, 'data/logs'))
        devApps.push({
            name: 'dev',
            script: join(__dirname, 'bin/dev.js'),
            output: join(root, 'data/logs/dev.log'),
            error: join(root, 'data/logs/dev-error.log'),
            watch: [
                join(root, 'addons/**/*.ts'),
            ],
            restart_delay: 5000
        });
        devApps.push({
            name: 'template_dev',
            script: join(__dirname, 'bin/template_dev.js'),
            output: join(root, 'data/logs/template_dev.log'),
            error: join(root, 'data/logs/template_dev-error.log')
        })
        fs.writeFileSync(join(root, 'config/pm2/dev.json'), JSON.stringify(devApps, null, 2));
        const prodApps: StartOptions[] = [];
        prodApps.push({
            name: 'prod',
            script: join(__dirname, 'bin/prod.js'),
            output: join(root, 'data/logs/prod.log'),
            error: join(root, 'data/logs/prod-error.log'),
            instances: cpus().length,
            exec_mode: '‘cluster’'
        });
        fs.writeFileSync(join(root, 'config/pm2/prod.json'), JSON.stringify(prodApps, null, 2));
        if (this.dev) {
            await execSync(`pm2 start ${join(root, 'config/pm2/dev.json')}`)
            // await execSync(`node ${join(__dirname, 'bin/template_dev')}`)
        } else {
            await execSync(`pm2 start ${join(root, 'config/pm2/prod.json')}`)
            await execSync(`node ${join(__dirname, 'bin/template_prod')}`)
        }
        console.log(`服务启动成功`)
    }
}
