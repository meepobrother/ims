"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./bootstrap");
require("./app.css");
require("antd/dist/antd.css");
const react_1 = __importDefault(require("react"));
let routes = [{
        path: "/adminer",
        roles: [],
        routes: [{
                path: "/adminer/manager",
                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager" */ "../../../ims-adminer/addon/template/admin/layout")))),
                roles: [],
                routes: [{
                        path: "/adminer/manager/system",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-system" */ "../../../ims-adminer/addon/template/admin/manager/pages/system")))),
                        name: "系统",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/share",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-share" */ "../../../ims-adminer/addon/template/admin/manager/pages/share")))),
                        name: "联盟",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/shell",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-shell" */ "../../../ims-adminer/addon/template/admin/manager/pages/shell")))),
                        name: "监控",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/help",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-help" */ "../../../ims-adminer/addon/template/admin/manager/pages/help")))),
                        name: "帮助",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/home",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-home" */ "../../../ims-adminer/addon/template/admin/manager/pages/home")))),
                        name: "首页",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/user",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-user" */ "../../../ims-adminer/addon/template/admin/manager/pages/user")))),
                        name: "用户",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/message",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-message" */ "../../../ims-adminer/addon/template/admin/manager/pages/message")))),
                        name: "消息",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/manager/addons",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-manager-addons" */ "../../../ims-adminer/addon/template/admin/manager/pages/addons")))),
                        name: "应用",
                        roles: [],
                        routes: [],
                        store: {},
                    }],
                redirect: "/adminer/manager/home",
                store: {},
            }, {
                path: "/adminer/ucenter",
                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter" */ "../../../ims-adminer/addon/template/admin/ucenter/layouts/index")))),
                roles: [],
                routes: [{
                        path: "/adminer/ucenter/info",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-info" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/info")))),
                        name: "个人信息",
                        roles: [],
                        routes: [{
                                path: "/adminer/ucenter/info/baseinfo",
                                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-info-baseinfo" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/info/baseinfo")))),
                                name: "基础信息",
                                roles: [],
                                routes: [],
                                icon: "base",
                                store: {},
                            }, {
                                path: "/adminer/ucenter/info/safe",
                                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-info-safe" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/info/safe")))),
                                name: "安全设置",
                                roles: [],
                                routes: [],
                                icon: "base",
                                store: {},
                            }, {
                                path: "/adminer/ucenter/info/bind",
                                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-info-bind" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/info/bind")))),
                                name: "账号绑定",
                                roles: [],
                                routes: [],
                                icon: "base",
                                store: {},
                            }, {
                                path: "/adminer/ucenter/info/notice",
                                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-info-notice" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/info/notice")))),
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
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-appstore" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/appstore")))),
                        name: "应用商城",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/addons",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-addons" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/addons")))),
                        name: "我的应用",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/collection",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-collection" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/collection")))),
                        name: "我的收藏",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/comments",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-comments" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/comments")))),
                        name: "我的评论",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/develement",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-develement" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/develement")))),
                        name: "开发者认证",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/message",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-message" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/message")))),
                        name: "我的消息",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/realname",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-realname" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/realname")))),
                        name: "实名认证",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/subscribe",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-subscribe" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/subscribe")))),
                        name: "我的订阅",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }, {
                        path: "/adminer/ucenter/setting",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-ucenter-setting" */ "../../../ims-adminer/addon/template/admin/ucenter/pages/setting")))),
                        name: "个人设置",
                        roles: [],
                        routes: [],
                        icon: "user",
                        store: {},
                    }],
                redirect: "/adminer/ucenter/info",
                store: {},
            }, {
                path: "/adminer/website",
                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-website" */ "../../../ims-adminer/addon/template/admin/website/layouts")))),
                roles: [],
                routes: [{
                        path: "/adminer/website/home",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-website-home" */ "../../../ims-adminer/addon/template/admin/website/pages/home")))),
                        name: "首页",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/website/login",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-website-login" */ "../../../ims-adminer/addon/template/admin/website/pages/login")))),
                        name: "登录",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/website/register",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-website-register" */ "../../../ims-adminer/addon/template/admin/website/pages/register")))),
                        name: "注册",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/website/forget",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-website-forget" */ "../../../ims-adminer/addon/template/admin/website/pages/forget")))),
                        name: "忘记密码",
                        roles: [],
                        routes: [],
                        store: {},
                    }, {
                        path: "/adminer/website/news",
                        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "adminer-website-news" */ "../../../ims-adminer/addon/template/admin/website/pages/news")))),
                        name: "新闻动态",
                        roles: [],
                        routes: [],
                        store: {},
                    }],
                redirect: "/adminer/website/home",
                store: {},
            }],
        redirect: "/adminer/ucenter",
        store: { imsAdminerRouter: require('../../../ims-adminer/addon/template/store/router').default, },
    }, {
        path: "/ims-website/editor",
        component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "ims-website-editor" */ "../../../ims-website/lib/template/editor/layout")))),
        roles: [],
        routes: [{
                path: "/ims-website/editor/index",
                component: react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require(/* webpackChunkName: "ims-website-editor-index" */ "../../../ims-website/lib/template/editor/index/index")))),
                roles: [],
                routes: [],
                store: {},
            }],
        redirect: "/ims-website/editor/index",
        store: {},
    }];
bootstrap_1.bootstrap(routes);
