import { Addon } from 'ims-core';
import { ImsIndex, ImsUser } from './inc';
import { ImsInstallTemplate } from './template'

@Addon({
    incs: [ImsIndex, ImsUser],
    template: ImsInstallTemplate,
    sourceRoot: __dirname,
    path: '/'
})
export default class ImsAddonInstall { }
