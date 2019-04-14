"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ims_util_1 = __importDefault(require("ims-util"));
class Cookie {
    constructor() {
        this.left = [{
                title: '首页',
                href: '/home/index'
            }, {
                title: '安装',
                href: '/home/install'
            }, {
                title: '新闻',
                href: '/home/news'
            }, {
                title: '产品',
                href: '/home/products'
            }];
        this.right = [{
                title: '登录',
                href: '/home/login'
            }, {
                title: '注册',
                href: '/home/register'
            }];
        this.footer = {
            links: [{
                    title: '关于我们',
                    href: '/home/aboutus'
                }, {
                    title: '联系我们',
                    href: '/home/concat'
                }],
            copyright: 'powser by 杭州米波网络科技有限公司'
        };
    }
    load() {
        ims_util_1.default.http.get('/');
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Cookie.prototype, "logo", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], Cookie.prototype, "left", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], Cookie.prototype, "right", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Cookie.prototype, "footer", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Cookie.prototype, "load", null);
exports.default = Cookie;
