import { Addon } from 'ims-core';
import { ImsAddonUserTypeorm } from './typeorm'
import { ImsAddonUserTemplate } from './template'
import * as incs from './inc'
/**
 * 用户管理
 */
@Addon({
    incs,
    typeorm: ImsAddonUserTypeorm,
    template: ImsAddonUserTemplate
})
export class ImsAddonUser { }
