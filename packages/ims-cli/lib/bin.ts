#!/usr/bin/env node
import { bootstrap } from './core/bootstrap';
import { visitor } from 'ims-common';
import { App } from 'ims-core';
import { ImsBuild } from './index'
import { ImsInit } from './init'
import { ImsStart } from './start'

@App({
    name: 'ims',
    version: '1.0.0',
    commands: [
        ImsBuild, ImsInit, ImsStart
    ]
})
export class ImsCli { }
bootstrap(visitor.visitType(ImsCli))
