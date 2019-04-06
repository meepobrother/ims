import { Addon } from 'ims-core';
import { ImsCoreTemplate } from './template'
import { ImsCoreTypeorm } from './typeorm'
import * as incs from './inc'

@Addon({
    name: '核心',
    icon: '',
    author: 'ims',
    version: '0.01',
    desc: 'IMS核心',
    incs: incs,
    template: ImsCoreTemplate,
    typeorm: ImsCoreTypeorm,
    type: 'system'
})
export class ImsCore { }
