import fs from 'fs-extra';
import { join } from 'path';

let key: {
    id: string;
    privKey: string;
    pubKey: string;
};
export function getKey(): {
    id: string;
    privKey: string;
    pubKey: string;
} {
    if (key) return key;
    const path = join(process.cwd(), 'config/server.json')
    if (fs.existsSync(path)) {
        key = require(path);
        return key;
    } else {
        throw new Error(`server.json is not found`)
    }
}