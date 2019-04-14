import { Template } from 'ims-core'

@Template({
    admins: [
        // 权限不足
        {
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
            store: {
                homeLayout: 'store/homeLayout',
                login: 'store/login',
                cookie: 'store/cookie',
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
            component: 'adminer/addon-list',
            roles: ['admin'],
            store: {
                addonList: 'store/addon-list'
            }
        }
    ]
})
export class ImsAdminerTemplate { }
