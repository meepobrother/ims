"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
const path_1 = require("path");
const root = process.cwd();
exports.log4 = log4js_1.configure({
    appenders: {
        file: {
            type: 'file',
            filename: path_1.join(root, 'data/logs/ims-logger.log'),
            maxLogSize: 10 * 1024 * 1024,
            backups: 7,
            compress: true,
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
