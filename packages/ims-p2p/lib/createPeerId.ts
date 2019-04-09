import { ensureDirSync, writeFileSync, existsSync } from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import PeerId from 'peer-id';
export async function createPeerId(type: string = 'server'): Promise<PeerId> {
    const configPath = join(root, `config/${type}.json`);
    ensureDirSync(dirname(configPath));
    return new Promise((resolve, reject) => {
        if (existsSync(configPath)) {
            const config = require(configPath)
            return PeerId.createFromJSON(config, (err, id) => {
                if (err) reject(err);
                resolve(id);
            });
        } else {
            return PeerId.create((err, id) => {
                if (err) reject(err);
                writeFileSync(configPath, JSON.stringify(id.toJSON(), null, 2))
                resolve(id);
            });
        }
    })
}