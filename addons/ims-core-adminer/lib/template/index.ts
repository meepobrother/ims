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
                path: '/403',
                component: '403'
            },
            {
                path: '/404',
                component: '404'
            },
            {
                path: '/500',
                component: '500'
            },
            {
                path: '/home',
                component: 'home'
            }, {
                path: '/login',
                component: 'login',
            }, {
                path: '/adminer',
                component: 'addon-list',
                roles: ['admin', 'manager'],
                store: {
                    addonList: 'store/addon-list'
                }
            }
        ]
    }]
})
export class ImsAdminerTemplate { }
