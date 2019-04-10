import { Command, Input } from 'ims-core';
import { ImsCommand } from '../command';
import { join } from 'path';
import { exec } from 'shelljs'
import { StartOptions } from 'pm2'
import fs from 'fs-extra'
@Command({
    name: 'start'
})
export class ImsStart extends ImsCommand {
    @Input({
        alis: 't'
    })
    type: 'dev' | 'prod' = 'dev';

    async run() {
        const root = process.cwd();
        exec(`pm2 kill`, { cwd: root }, () => {
            const devApps: StartOptions[] = [];
            fs.ensureDirSync(join(root, 'config/pm2'))
            devApps.push({
                name: 'template',
                script: join(__dirname, 'bin/template_dev.js')
            })
            devApps.push({
                name: 'dev',
                script: join(__dirname, 'bin/dev.js')
            });
            fs.writeFileSync(join(root, 'config/pm2/dev.json'), JSON.stringify(devApps, null, 2));

            const prodApps: StartOptions[] = [];

            prodApps.push({
                name: 'template',
                script: join(__dirname, 'bin/template_prod.js')
            })
            prodApps.push({
                name: 'dev',
                script: join(__dirname, 'bin/prod.js')
            });
            fs.writeFileSync(join(root, 'config/pm2/prod.json'), JSON.stringify(prodApps, null, 2));

            if (this.type === 'dev') {
                exec(`pm2 start ${join(root, 'config/pm2/dev.json')}`)
            } else {
                exec(`pm2 start ${join(root, 'config/pm2/prod.json')}`)
            }
        })
    }
}
