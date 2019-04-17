import { Addon } from "ims-core";
import { ImsAdminerTemplate } from './template'
import { ImsCoreAdminerTypeorm } from './typeorm'
import * as incs from './inc';
@Addon({
    template: ImsAdminerTemplate,
    typeorm: ImsCoreAdminerTypeorm,
    incs: incs,
    sourceRoot: __dirname,
    path: '/'
})
export default class ImsAddonAdminer { }
