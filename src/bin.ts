#!/usr/bin/env node
import cliRef from 'ims-platform-cli';
import { App } from 'ims-common';
import { ImsCommandBuild, ImsCommandCreate, ImsCommandVersion } from 'ims-cli'
@App({
    name: 'ims',
    version: '1.0.0',
    commands: [
        ImsCommandBuild, ImsCommandCreate, ImsCommandVersion
    ]
})
export class ImsCli { }
cliRef.bootstrap(ImsCli)
