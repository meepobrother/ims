import { Addon } from "ims-core";
import { ImsAdminerTemplate } from './template'
import * as incs from './inc';
@Addon({
    template: ImsAdminerTemplate,
    incs: incs,
    type: 'system',
    sourceRoot: __dirname
})
export default class ImsCoreAddons { }
