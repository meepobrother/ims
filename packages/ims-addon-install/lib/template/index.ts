import { Template } from "ims-core";

@Template({
    mobiles: [],
    admins: [{
        path: '/*',
        component: 'admin/install'
    }]
})
export class ImsInstallTemplate { } 