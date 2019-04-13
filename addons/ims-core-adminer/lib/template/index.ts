import { Template } from 'ims-core'

@Template({
    admins: [{
        path: '/login',
        component: 'login',
        store: {
            login: 'store/login',
            cookie: 'store/cookie'
        }
    }, {
        path: '/adminer',
        component: 'addon-list',
        roles: ['admin']
    }]
})
export class ImsAdminerTemplate { }
