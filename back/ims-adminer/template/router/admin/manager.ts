/** 管理 */
import { Router } from 'ims-core';

@Router({
    path: '/addons',
    component: 'admin/manager/pages/addons',
    name: '应用'
})
class ImsRouterAdminAddon { }

@Router({
    path: '/message',
    component: 'admin/manager/pages/message',
    name: '消息'
})
class ImsRouterAdminMessage { }

@Router({
    path: '/user',
    component: 'admin/manager/pages/user',
    name: '用户'
})
class ImsRouterAdminUser { }

@Router({
    path: '/home',
    component: 'admin/manager/pages/home',
    name: '首页'
})
class ImsRouterAdminHome { }

@Router({
    path: '/help',
    component: 'admin/manager/pages/help',
    name: '帮助'
})
class ImsRouterAdminHelp { }

@Router({
    path: '/shell',
    component: 'admin/manager/pages/shell',
    name: '监控'
})
class ImsRouterAdminShell { }

@Router({
    path: '/system',
    component: 'admin/manager/pages/system',
    name: '系统'
})
class ImsRouterAdminSystem { }

@Router({
    path: '/share',
    component: 'admin/manager/pages/share',
    name: '联盟'
})
class ImsRouterAdminShare { }


@Router({
    path: '/manager',
    component: 'admin/layout',
    redirect: 'home',
    routes: [
        ImsRouterAdminSystem,
        ImsRouterAdminShare,
        ImsRouterAdminShell,
        ImsRouterAdminHelp,
        ImsRouterAdminHome,
        ImsRouterAdminUser,
        ImsRouterAdminMessage,
        ImsRouterAdminAddon
    ]
})
export class ImsAdminerRouterManager { }
