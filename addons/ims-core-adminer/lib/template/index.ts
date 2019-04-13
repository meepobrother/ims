import { Template } from 'ims-core'

@Template({
    admins: [{
        path: '/',
        redirect: 'home',
        routes: [
            {
                path: '/',
                component: 'home'
            }, {
                path: '/login',
                component: 'login',
                store: {
                    login: 'store/login',
                    cookie: 'store/cookie'
                }
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
