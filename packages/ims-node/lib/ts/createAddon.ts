import fs from 'fs-extra';
import { join } from 'path';
import { createController } from './createController'
import { getAddonPath } from './addon'
export function createAddon(root: string) {
    try {
        const addonPath = getAddonPath(join(root, 'index.ts'));
        const incPath = join(root, 'inc');
        if (fs.existsSync(incPath)) {
            const paths = fs.readdirSync(incPath);
            const output = join(root, 'template/inc')
            paths.map(file => {
                createPath(incPath, file, output, addonPath)
            });
        }
    } catch (e) {
        throw e;
    }
}

function createPath(root: string, file: string, output: string, basePath: string) {
    const p = join(root, file)
    const o = join(output, file);
    const stat = fs.statSync(p)
    if (stat.isFile()) {
        if (p.endsWith('.ts')) {
            createController(p, o, basePath);
        }
    } else if (stat.isDirectory()) {
        const files = fs.readdirSync(p);
        files.map(file => {
            createPath(p, file, o, basePath)
        })
    }
}