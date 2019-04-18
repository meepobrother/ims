import { Template } from "ims-core";
import { ImsIndex, ImsUser } from './inc';
@Template({
    mobiles: [],
    admins: [{
        path: '/',
        component: 'admin/install'
    }],
    incs: [ImsIndex, ImsUser]
})
export class ImsInstallTemplate { } 