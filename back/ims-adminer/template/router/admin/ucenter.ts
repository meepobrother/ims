/** 用户中心 */
import { Router } from 'ims-core';
@Router({
    path: '/baseinfo',
    component: 'admin/ucenter/pages/info/baseinfo',
    name: '基础信息',
    icon: 'base'
})
export class ImsAdminerRouterUsercenterInfoBaseInfo { }
@Router({
    path: '/bind',
    component: 'admin/ucenter/pages/info/bind',
    name: '账号绑定',
    icon: 'base'
})
export class ImsAdminerRouterUsercenterInfoBind { }
@Router({
    path: '/notice',
    component: 'admin/ucenter/pages/info/notice',
    name: '消息通知',
    icon: 'base'
})
export class ImsAdminerRouterUsercenterInfoBindNotice { }
@Router({
    path: '/safe',
    component: 'admin/ucenter/pages/info/safe',
    name: '安全设置',
    icon: 'base'
})
export class ImsAdminerRouterUsercenterInfoSafe { }
/** 个人信息 */
@Router({
    path: '/info',
    component: 'admin/ucenter/pages/info',
    name: '个人信息',
    icon: 'user',
    exact: false,
    routes: [
        ImsAdminerRouterUsercenterInfoBaseInfo,
        ImsAdminerRouterUsercenterInfoSafe,
        ImsAdminerRouterUsercenterInfoBind,
        ImsAdminerRouterUsercenterInfoBindNotice
    ]
})
class ImsAdminerRouterUsercenterInfo { }

@Router({
    path: '/appstore',
    component: 'admin/ucenter/pages/appstore',
    name: '应用商城',
    icon: 'user'
})
class ImsAdminerRouterUsercenterAppStore { }

@Router({
    path: '/addons',
    component: 'admin/ucenter/pages/addons',
    name: '我的应用',
    icon: 'user'
})
class ImsAdminerRouterUsercenterAddons { }

@Router({
    path: '/collection',
    component: 'admin/ucenter/pages/collection',
    name: '我的收藏',
    icon: 'user'
})
class ImsAdminerRouterUsercenterCollection { }


@Router({
    path: '/comments',
    component: 'admin/ucenter/pages/comments',
    name: '我的评论',
    icon: 'user'
})
class ImsAdminerRouterUsercenterComments { }

@Router({
    path: '/develement',
    component: 'admin/ucenter/pages/develement',
    name: '开发者认证',
    icon: 'user'
})
class ImsAdminerRouterUsercenterDevelement { }

@Router({
    path: '/message',
    component: 'admin/ucenter/pages/message',
    name: '我的消息',
    icon: 'user'
})
class ImsAdminerRouterUsercenterMessage { }

@Router({
    path: '/realname',
    component: 'admin/ucenter/pages/realname',
    name: '实名认证',
    icon: 'user'
})
class ImsAdminerRouterUsercenterRealname { }

@Router({
    path: '/subscribe',
    component: 'admin/ucenter/pages/subscribe',
    name: '我的订阅',
    icon: 'user'
})
class ImsAdminerRouterUsercenterSubscribe { }

@Router({
    path: '/setting',
    component: 'admin/ucenter/pages/setting',
    name: '个人设置',
    icon: 'user'
})
class ImsAdminerRouterUsercenterSetting { }

@Router({
    path: '/ucenter',
    component: 'admin/ucenter/layouts/index',
    redirect: 'info',
    routes: [
        ImsAdminerRouterUsercenterInfo,
        ImsAdminerRouterUsercenterAppStore,
        ImsAdminerRouterUsercenterAddons,
        ImsAdminerRouterUsercenterCollection,
        ImsAdminerRouterUsercenterComments,
        ImsAdminerRouterUsercenterDevelement,
        ImsAdminerRouterUsercenterMessage,
        ImsAdminerRouterUsercenterRealname,
        ImsAdminerRouterUsercenterSubscribe,
        ImsAdminerRouterUsercenterSetting
    ]
})
export class ImsAdminerRouterUsercenter { }
