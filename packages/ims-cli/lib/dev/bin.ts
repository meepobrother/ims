#!/usr/bin/env node
import { bootstrap } from '../start/bootstrap'
import { bootstrap as templateBootstrap } from '../start/bin/template';
async function start() {
    const root = process.cwd();
    await bootstrap(root, true)
    await templateBootstrap(true);
    console.log(`服务启动成功`)
}
start();
