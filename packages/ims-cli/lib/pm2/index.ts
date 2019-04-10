import { Command, Input } from 'ims-core';
import { start } from 'pm2'
import { join } from 'path';
import * as ts from 'typescript'
import { readFileSync } from 'fs-extra'
const root = process.cwd();
const config = require(join(root, 'tsconfig.json'));
import { exec } from 'shelljs'

function tsc(script: string) {
    return new Promise((resolve, reject) => {
        exec(`tsc ${script}`, {
            cwd: root
        }, () => {
            resolve()
        });
    })
}
@Command()
export class ImsCommandPm2 {
    @Input({
        alis: 'n'
    })
    name: string;
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
        if (this.script.endsWith('.ts')) {
            await tsc(this.script)
            debugger;
        }
        this.error = join(root, 'config/logs', `${this.name}_error.log`)
        this.output = join(root, 'config/logs', `${this.name}.log`)
        start({
            script: this.script,
            name: this.name,
            cwd: root,
            output: this.output,
            error: this.error,
            watch: this.watch
        }, () => {
            process.exit();
        });
    }
}
