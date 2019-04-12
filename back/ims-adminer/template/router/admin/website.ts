/** 官网CMS */
import { Router } from 'ims-core';

@Router({
    path: '/home',
    component: 'admin/website/pages/home',
    name: '首页'
})
class ImsRouterAdminWebsiteHome { }

@Router({
    path: '/news',
    component: 'admin/website/pages/news',
    name: '新闻动态'
})
class ImsRouterAdminWebsiteNews { }

@Router({
    path: '/login',
    component: 'admin/website/pages/login',
    name: '登录'
})
class ImsRouterAdminWebsiteLogin { }

@Router({
    path: '/register',
    component: 'admin/website/pages/register',
    name: '注册'
})
class ImsRouterAdminWebsiteRegister { }

@Router({
    path: '/forget',
    component: 'admin/website/pages/forget',
    name: '忘记密码'
})
class ImsRouterAdminWebsiteForget { }

@Router({
    path: '/website',
    component: 'admin/website/layouts',
    redirect: 'home',
    routes: [
        ImsRouterAdminWebsiteHome,
        ImsRouterAdminWebsiteLogin,
        ImsRouterAdminWebsiteRegister,
        ImsRouterAdminWebsiteForget,
        ImsRouterAdminWebsiteNews
    ]
})
export class ImsAdminerRouterWebsite { }


