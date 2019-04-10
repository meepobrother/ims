#!/usr/bin/env node
import bootstrap from './core/bootstrap';
import { visitor } from 'ims-common';
import { App } from 'ims-core';
import { ImsCommandBuild, ImsCommandVersion } from './index'
import { ImsInit } from './init'
import { ImsStart } from './start'

@App({
    name: 'ims',
    version: '1.0.0',
    commands: [
        ImsCommandBuild, ImsCommandVersion,
        ImsInit, ImsStart
    ]
})
export class ImsCli { }
bootstrap(visitor.visitType(ImsCli))
