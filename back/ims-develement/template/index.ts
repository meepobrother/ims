import { Template, Router } from 'ims-core';

@Router({
    path: '/addon',
    component: 'admin/pages/addon',
    name: '应用'
})
class ImsAdminAddon { }

@Router({
    path: '/plugin',
    component: 'admin/pages/plugin',
    name: '插件'
})
class ImsAdminPlugin { }

@Router({
    path: '/template',
    component: 'admin/pages/template',
    name: '模板'
})
class ImsAdminTemplate { }

@Router({
    path: '/orders',
    component: 'admin/pages/orders',
    name: '订单'
})
class ImsAdminOrders { }

@Router({
    path: '/refund',
    component: 'admin/pages/refund',
    name: '退款申请'
})
class ImsAdminRefund { }

@Router({
    path: '/appeal',
    component: 'admin/pages/appeal',
    name: '申诉管理'
})
class ImsAdminAppeal { }

@Router({
    path: '/finance',
    component: 'admin/pages/finance',
    name: '财务管理'
})
class ImsAdminFinance { }

@Router({
    path: '/statics',
    component: 'admin/pages/statics',
    name: '统计'
})
class ImsAdminStatics { }

@Router({
    path: '/personal',
    component: 'admin/pages/personal',
    name: '开发者认证'
})
class ImsAdminPersonal { }

@Router({
    path: '/numkey',
    component: 'admin/pages/numkey',
    name: '数字证书'
})
class ImsAdminNumkey { }

@Router({
    path: '/docs',
    component: 'admin/pages/docs',
    name: '文档'
})
class ImsAdminDocs { }

@Router({
    path: '/dev',
    component: 'admin/layout',
    name: '模板',
    routes: [
        ImsAdminAddon,
        ImsAdminPlugin,
        ImsAdminTemplate,
        ImsAdminOrders,
        ImsAdminRefund,
        ImsAdminAppeal,
        ImsAdminFinance,
        ImsAdminStatics,
        ImsAdminPersonal,
        ImsAdminNumkey,
        ImsAdminDocs
    ]
})
class ImsAdminRouter { }

@Template({
    mobiles: [],
    admins: [
        ImsAdminRouter
    ]
})
export class ImsDevelementTemplate { }


