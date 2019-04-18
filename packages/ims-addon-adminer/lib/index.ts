import { Addon } from "ims-core";
import { ImsAdminerTemplate } from './template'
import { ImsCoreAdminerTypeorm } from './typeorm'
import { ImsCoreAdminerDashboard, ImsCoreAdminerServer, ImsCoreAdminerSetting, ImsCoreAdminerUnion, ImsCoreAdminerUser } from './inc';
@Addon({
    template: ImsAdminerTemplate,
    typeorm: ImsCoreAdminerTypeorm,
    incs: [
        ImsCoreAdminerDashboard, ImsCoreAdminerServer,
        ImsCoreAdminerSetting, ImsCoreAdminerUnion,
        ImsCoreAdminerUser
    ],
    sourceRoot: __dirname,
    path: '/'
})
export default class ImsAddonAdminer { }
