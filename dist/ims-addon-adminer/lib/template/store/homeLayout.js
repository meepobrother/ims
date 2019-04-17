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
const ims_adminer_1 = require("ims-adminer");
const login_1 = __importDefault(require("./login"));
class HomeLayout {
    constructor() {
        this.left = [{
                title: '首页',
                href: '/home/index'
            }];
        this.right = [{
                title: '登录',
                href: '/home/login'
            }, {
                title: '注册',
                href: '/home/register'
            }];
        this.userMenus = [{
                title: '进入后台',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer');
                }
            }, {
                title: '退出登录',
                onClick: () => {
                    login_1.default.logout();
                }
            }];
        this.footer = {
            links: [{
                    title: '关于我们',
                    href: '/home/aboutus'
                }, {
                    title: '联系我们',
                    href: '/home/concat'
                }],
            copyright: 'Powser By 杭州米波网络科技有限公司'
        };
    }
    load() {
        ims_util_1.default.http.get('/');
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], HomeLayout.prototype, "logo", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], HomeLayout.prototype, "left", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], HomeLayout.prototype, "right", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], HomeLayout.prototype, "userMenus", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], HomeLayout.prototype, "footer", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeLayout.prototype, "load", null);
exports.HomeLayout = HomeLayout;
exports.default = new HomeLayout();
