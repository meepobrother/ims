import { Template } from 'ims-core'

@Template({
    admins: [
        // 权限不足
        {
            path: '/error',
            component: 'layout',
            store: {
                homeLayout: 'store/homeLayout'
            },
            routes: [{
                path: '/403',
                component: '403'
            },
            // 404资源没有找到
            {
                path: '/404',
                component: '404'
            },
            // 服务器错误
            {
                path: '/500',
                component: '500'
            }]
        },
        // 首页
        {
            path: '/',
            redirect: '/home/index'
        },
        // 官网
        {
            path: '/home',
            component: 'home/layout',
            redirect: '/home/index',
            store: {
                homeLayout: 'store/homeLayout',
                login: 'store/login'
            },
            routes: [
                {
                    path: '/index',
                    component: 'home/index'
                }, {
                    path: '/news',
                    component: 'home/news'
                }, {
                    path: '/products',
                    component: 'home/products'
                }, {
                    path: '/login',
                    component: 'home/login',
                }, {
                    path: '/register',
                    component: 'home/register',
                }, {
                    path: '/install',
                    component: 'home/install',
                }
            ]
        },
        // 后台管理
        {
            path: '/adminer',
            component: 'adminer/layout',
            roles: ['admin'],
            redirect: '/adminer/dashboard/analysis',
            store: {
                addonList: 'store/addon-list',
                adminerLayout: 'store/adminerLayout'
            },
            routes: [{
                path: '/dashboard',
                redirect: '/adminer/dashboard/analysis',
                component: 'adminer/dashboard/layout',
                store: {
                    analysis: 'adminer/dashboard/analysis/store'
                },
                routes: [{
                    path: '/analysis',
                    component: 'adminer/dashboard/analysis'
                }]
            }, {
                path: '/addon',
                component: 'adminer/addon/layout',
                routes: [{
                    path: '/design',
                    component: 'adminer/addon/design',
                    store: {
                        design: 'adminer/addon/design/store'
                    }
                }, {
                    path: '/mine',
                    component: 'adminer/addon/mine',
                    store: {
                        mine: 'adminer/addon/mine/store'
                    }
                }]
            }, {
                path: '/addon-list',
                component: 'adminer/addon-list'
            }, {
                path: '/addon-list/:id',
                component: 'adminer/addon-list'
            }, {
                path: '/addon-edit/:id',
                component: 'adminer/addon-edit'
            },
            // manager
            {
                path: '/manager/home',
                component: 'adminer/manager/home/index'
            },
            // shop
            {
                path: '/shop/home',
                component: 'adminer/shop/home/index'
            },
            //集群
            {
                path: '/services',
                component: 'adminer/services/layout',
                store: {
                    home: 'adminer/services/list/store',
                    add: 'adminer/services/add/store'
                }
            },
            //联盟
            {
                path: '/union/home',
                component: 'adminer/union/home/index',
                store: {
                    union: 'adminer/union/home/store'
                }
            }]
        },

    ]
})
export class ImsAdminerTemplate { }
