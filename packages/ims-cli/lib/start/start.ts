#!/usr/bin/env node
import { start, Proc } from 'pm2';
import { join } from 'path';
const root = process.cwd();
const serverLogFile = join(root, 'data/logs/server.log')
const serverErrorLogFile = join(root, 'data/logs/server-error.log')
start({
    name: 'server',
    script: join(__dirname, 'bin/build.js'),
    args: [],
    interpreter_args: [],
    cwd: root,
    output: serverLogFile,
    error: serverErrorLogFile,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    // restart_delay: 300,
}, (err: Error, proc: Proc) => {
    process.exit(0);
});

