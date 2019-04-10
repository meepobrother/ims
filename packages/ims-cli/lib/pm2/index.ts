import { Command, Input } from 'ims-core';
import { start, Proc } from 'pm2';
import { join } from 'path';
const root = process.cwd();
import { exec } from 'shelljs'
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
            const command = `pm2 start ${this.script} --name="${this.name}" --output="${this.output}" --error="${this.error}"`;
            console.log(command)
            exec(command, { cwd: root }, () => resolve())
        })
    }
}
