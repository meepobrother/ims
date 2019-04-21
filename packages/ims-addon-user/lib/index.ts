import { Addon } from 'ims-core';
import { ImsAddonUserTypeorm } from './typeorm'
import { ImsAddonUserTemplate } from './template'
import { ImsAddonUserInc } from './inc'
/**
 * 用户管理
 */
@Addon({
    incs: [ImsAddonUserInc],
    typeorm: ImsAddonUserTypeorm,
    template: ImsAddonUserTemplate,
    sourceRoot: __dirname,
})
export class ImsAddonUser { }
