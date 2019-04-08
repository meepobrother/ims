"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
async function bootstrap(_routes) {
    const routes = _routes.map(route => transformHandler(route));
    const router = new router_1.ImsRouter(routes);
    const route = await router.resolve('/adminer/manager/help');
    debugger;
}
exports.bootstrap = bootstrap;
function transformHandler(route, parent = null) {
    const r = {};
    if (parent) {
        r.path = route.path.replace(parent.path + '/', '');
    }
    else {
        r.path = route.path;
    }
    r.name = route.name;
    r.parent = parent;
    r.action = (context, params) => {
        return route.component;
    };
    r.children = route.routes.map(route => transformHandler(route, r));
    return r;
}
let routes = [{
        path: "/adminer",
        component: '',
        roles: [],
        routes: [{
                path: "/adminer/manager",
                component: '',
                roles: [],
                routes: [{
                        path: "/adminer/manager/system",
                        component: '',
                        name: "系统",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/share",
                        component: '',
                        name: "联盟",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/shell",
                        component: '',
                        name: "监控",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/help",
                        component: '',
                        name: "帮助",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/home",
                        component: '',
                        name: "首页",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/user",
                        component: '',
                        name: "用户",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/message",
                        component: '',
                        name: "消息",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/addons",
                        component: '',
                        name: "应用",
                        roles: [],
                        routes: [],
                        store: {},
                    }],
                redirect: "/adminer/manager/home",
                store: {},
            }, {
                path: "/adminer/ucenter",
                component: '',
                roles: [],
                routes: [{
                        path: "/adminer/ucenter/info",
                        component: '',
                        name: "个人信息",
                        roles: [],
                        routes: [{
                                path: "/adminer/ucenter/info/baseinfo",
                                component: '',
                                name: "基础信息",
                                roles: [],
                                routes: [],
                                icon: "base",
                                store: {},
                            }, {
                                path: "/adminer/ucenter/info/safe",
                                component: '',
                                name: "安全设置",
                                roles: [],
                                routes: [],
                                icon: "base",
                                store: {},
                            }, {
                                path: "/adminer/ucenter/info/bind",
                                component: '',
                                name: "账号绑定",
                                roles: [],
                                routes: [],
                                icon: "base",
                                store: {},
                            }, {
                                path: "/adminer/ucenter/info/notice",
                                component: '',
                                name: "消息通知",
                                roles: [],
                                routes: [],
                                icon: "base",
                                store: {},
                            }],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/appstore",
                        component: '',
                        name: "应用商城",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/addons",
                        component: '',
                        name: "我的应用",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/collection",
                        component: '',
                        name: "我的收藏",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/comments",
                        component: '',
                        name: "我的评论",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/develement",
                        component: '',
                        name: "开发者认证",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/message",
                        component: '',
                        name: "我的消息",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }],
                redirect: "/adminer/ucenter/info",
                store: {},
            },],
        redirect: "/adminer/ucenter",
        store: { imsAdminerRouter: '', },
    }];
bootstrap(routes);
