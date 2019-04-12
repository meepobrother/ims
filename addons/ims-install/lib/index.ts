import { Addon } from 'ims-core';
import * as incs from './inc';
import { ImsInstallTemplate } from './template'

@Addon({
    incs: incs,
    template: ImsInstallTemplate,
    sourceRoot: __dirname
})
export default class ImsInstall { }
