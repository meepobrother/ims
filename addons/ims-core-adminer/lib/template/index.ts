import { Template } from 'ims-core'

@Template({
    admins: [{
        path: '/',
        redirect: 'home',
        store: {
            login: 'store/login',
            cookie: 'store/cookie',
        },
        routes: [
            {
                path: '/home',
                component: 'home'
            }, {
                path: '/login',
                component: 'login',
            }, {
                path: '/adminer',
                component: 'addon-list',
                roles: ['admin'],
                store: {
                    addonList: 'store/addon-list'
                }
            }
        ]
    }]
})
export class ImsAdminerTemplate { }
