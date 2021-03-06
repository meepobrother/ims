import { Addon } from 'ims-core';
import { ImsIndex } from './inc';
import { ImsInstallTemplate } from './template'

@Addon({
    incs: [ImsIndex],
    template: ImsInstallTemplate,
    sourceRoot: __dirname,
    path: '/',
    dev: true
})
export default class ImsAddonInstall { }
