import { Template } from "ims-core";
@Template({
    mobiles: [],
    admins: [{
        path: '/',
        component: 'admin/install'
    }, {
        path: '/error/403',
        component: '403'
    }, {
        path: '/error/404',
        component: '404'
    }, {
        path: '/error/500',
        component: '500'
    }]
})
export class ImsInstallTemplate { } 
