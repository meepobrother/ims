import { Command, Input } from 'ims-core';
import { ImsCommand } from '../command';
import { join } from 'path';
import { ImsCommandPm2 } from '../pm2'
import { exec } from 'shelljs'
@Command({
    name: 'start'
})
export class ImsStart extends ImsCommand {
    @Input({
        alis: 't'
    })
    type: 'dev' | 'prod' = 'dev';

    async run() {
        const pm2 = new ImsCommandPm2();
        exec(`pm2 kill`, {
            cwd: process.cwd()
        }, async () => {
            pm2.script = join(__dirname, 'bin/build.js');
            pm2.name = 'template';
            pm2.run();
            if (this.type === 'dev') {
                pm2.script = join(__dirname, 'bin/dev.js');
                pm2.name = 'dev';
                await pm2.run();
            }
            if (this.type === 'prod') {
                pm2.script = join(__dirname, 'bin/prod.js');
                pm2.name = 'prod';
                await pm2.run();
            }
        })
    }
}
