#!/usr/bin/env node

import { ImsPlatformHapi } from 'ims-platform-hapi';
import { packProject } from '../../build';

import yargs from 'yargs';
yargs.command(`start [project]`, false, (args) => {
    return args;
}, async (argv) => {
    const hapi = new ImsPlatformHapi()
    const project: any = argv.project;
    if (project) {
        await packProject(project, 'node_modules', 'packages', false)
        hapi.addAddon(require.resolve(project))
    }
    await hapi.init();
}).argv;
