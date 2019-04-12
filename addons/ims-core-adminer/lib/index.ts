import { Addon } from "ims-core";
import { ImsAdminerTemplate } from './template'
import { ImsCoreAdminerTypeorm } from './typeorm'
import * as incs from './inc';
@Addon({
    template: ImsAdminerTemplate,
    typeorm: ImsCoreAdminerTypeorm,
    incs: incs,
    type: 'system',
    sourceRoot: __dirname
})
export default class ImsCoreAddons { }
