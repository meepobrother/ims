import Memcached from 'memcached';
import { join } from 'path';
const root = process.cwd();
export function bootstrap(): Memcached {
    const configFile = join(root, 'config/config.json')
    const config = require(configFile);
    const memcached = new Memcached(config.memcached);
    return memcached;
}
