#!/usr/bin/env node
import { transformCli } from './core/bootstrap';
import { visitor } from 'ims-common';
import { Cli } from 'ims-core';
import { ImsBuild } from './index'
import { ImsInit } from './init'
import { ImsStart } from './start'
import { ImsBuildAll } from './buildAll'

@Cli({
    name: 'ims',
    version: '1.0.0',
    commands: [
        ImsBuild, ImsInit, ImsStart,
        ImsBuildAll
    ]
})
export class ImsCli { }
transformCli(visitor.visitType(ImsCli))
