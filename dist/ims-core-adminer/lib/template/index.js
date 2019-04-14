"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
let ImsAdminerTemplate = class ImsAdminerTemplate {
};
ImsAdminerTemplate = __decorate([
    ims_core_1.Template({
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
], ImsAdminerTemplate);
exports.ImsAdminerTemplate = ImsAdminerTemplate;
