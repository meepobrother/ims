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
        // 官网
        {
            path: '/',
            redirect: 'home',
            store: {
                login: 'store/login',
                cookie: 'store/cookie',
            },
            routes: [
                {
                    path: '/home',
                    component: 'home/index',
                    exact: true
                }, {
                    path: '/home/news',
                    component: 'home/news'
                }, {
                    path: '/home/products',
                    component: 'home/products'
                }, {
                    path: '/home/login',
                    component: 'home/login',
                }, {
                    path: '/home/register',
                    component: 'home/register',
                }, {
                    path: '/home/install',
                    component: 'home/install',
                },
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
