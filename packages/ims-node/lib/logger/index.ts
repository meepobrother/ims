import { configure } from 'log4js';
import { join } from 'path';
const root = process.cwd();
export const log4 = configure({
    appenders: {
        file: {
            type: 'file',
            filename: join(root, 'data/logs/ims-logger.log'),
            maxLogSize: 10 * 1024 * 1024, // = 10Mb
            backups: 7, // keep five backup files
            compress: true, // compress the backups
            encoding: 'utf-8',
            pattern: 'yyyy-MM-dd',
            mode: 0o0640,
            flags: 'w+'
        }
    },
    categories: {
        default: { appenders: ['file'], level: 'trace' }
    }
});

