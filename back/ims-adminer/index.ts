import { Addon } from 'ims-core';
import { ImsAdminerTemplate } from './template'
import { ImsAdminerTypeorm } from './typeorm'
import * as incs from './inc'

@Addon({
    name: '核心',
    icon: '',
    author: 'ims',
    version: '0.01',
    desc: 'IMS核心',
    incs: incs,
    template: ImsAdminerTemplate,
    typeorm: ImsAdminerTypeorm,
    type: 'system',
    sourceRoot: __dirname
})
export class ImsAdminer { }
