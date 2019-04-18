import fs from 'fs-extra';
import { join } from 'path';
import { createController } from './createController'
export function createAddon(root: string) {
    try {
        const incPath = join(root, 'inc')
        const paths = fs.readdirSync(incPath);
        const output = join(root, 'template/inc')
        paths.map(file => {
            createPath(incPath, file, output)
        });
    } catch (e) {
        console.log(e.message);
    }
}

function createPath(root: string, file: string, output: string) {
    const p = join(root, file)
    const o = join(output, file);
    const stat = fs.statSync(p)
    if (stat.isFile()) {
        if (p.endsWith('.ts')) {
            createController(p, o);
        }
    } else if (stat.isDirectory()) {
        const files = fs.readdirSync(p);
        files.map(file => {
            createPath(p, file, o)
        })
    }
}