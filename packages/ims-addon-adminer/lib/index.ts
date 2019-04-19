import { Addon } from "ims-core";
import { ImsAdminerTemplate } from './template'
import { ImsCoreAdminerTypeorm } from './typeorm'
import {
    ImsCoreAdminerDashboard, ImsCoreAdminerServer, ImsCoreAdminerSetting,
    ImsCoreAdminerUnion, ImsCoreAdminerUser, ImsAddonAdminerInstall
} from './inc';
@Addon({
    template: ImsAdminerTemplate,
    typeorm: ImsCoreAdminerTypeorm,
    incs: [
        ImsCoreAdminerDashboard, ImsCoreAdminerServer,
        ImsCoreAdminerSetting, ImsCoreAdminerUnion,
        ImsCoreAdminerUser, ImsAddonAdminerInstall
    ],
    sourceRoot: __dirname,
    path: '/',
    dev: true
})
export default class ImsAddonAdminer { }
