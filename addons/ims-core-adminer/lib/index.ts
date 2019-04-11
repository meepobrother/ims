import { Addon } from "ims-core";
import { ImsAdminerTemplate } from './template'
@Addon({
    template: ImsAdminerTemplate,
    type: 'system',
    sourceRoot: __dirname
})
export default class ImsCoreAddons { }
