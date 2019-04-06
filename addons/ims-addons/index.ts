import { Addon } from 'ims-core';
import { ImsAddonTypeOrm } from './typeorm'
import { ImsAddonsTemplate } from './template'
import * as incs from './inc'

@Addon({
    name: '应用管理',
    icon: '',
    author: 'ims',
    desc: '管理应用',
    template: ImsAddonsTemplate,
    typeorm: ImsAddonTypeOrm,
    sourceRoot: __dirname,
    incs: incs
})
export default class ImsAddons { }
