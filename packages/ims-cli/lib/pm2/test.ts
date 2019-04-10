import { ImsCommandPm2 } from './index'
import { join } from 'path';
const pm2 = new ImsCommandPm2();
pm2.script = join(__dirname, 'test.run.ts')
pm2.run();