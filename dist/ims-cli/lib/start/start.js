"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pm2_1 = require("pm2");
const path_1 = require("path");
const root = process.cwd();
const serverLogFile = path_1.join(root, 'data/logs/server.log');
const serverErrorLogFile = path_1.join(root, 'data/logs/server-error.log');
pm2_1.start({
    name: 'server',
    script: path_1.join(__dirname, '1.js'),
    args: [],
    interpreter_args: [],
    cwd: root,
    output: serverLogFile,
    error: serverErrorLogFile,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
}, (err, proc) => {
    process.exit(0);
});
