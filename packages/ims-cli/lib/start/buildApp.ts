import ImsInstall from 'ims-install';
import { join } from 'path';
import fs from 'fs-extra'
export function buildApp() {
    const root = process.cwd();
    const configPath = join(root, 'config/config.json');
    const addons = [];
    if (fs.existsSync(configPath)) {

    } else {
        addons.push(ImsInstall)
    }
    return addons;
}