import { Command, Input } from 'ims-core';
import { start, Proc } from 'pm2'
import { join } from 'path';
const root = process.cwd();

@Command()
export class ImsCommandPm2 {
    @Input({
        alis: 'n'
    })
    name: string = 'ims';

    @Input({
        alis: 's'
    })
    script: string;

    @Input({
        alis: 'w'
    })
    watch: string[];

    output: string;
    error: string;

    async run() {
        return new Promise((resolve, reject) => {
            this.error = join(root, 'config/logs', `${this.name}_error.log`)
            this.output = join(root, 'config/logs', `${this.name}.log`)
            start({
                script: this.script,
                name: this.name,
                cwd: root,
                output: this.output,
                error: this.error,
                watch: this.watch,
                log_date_format: 'YYYY-MM-DD HH:mm Z',
            }, (err: Error, proc: Proc) => {
                if(err) reject(err);
                else resolve(proc);
            });
        })
    }
}
