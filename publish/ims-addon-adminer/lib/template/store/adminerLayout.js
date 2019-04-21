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
class AdminerLayout {
    constructor() {
        this.collapsedIcon = 'menu-fold';
        this.copyright = 'Powser By 杭州米波网络科技有限公司';
        this.menus = [{
                title: '官网首页',
                onClick: () => {
                    ims_adminer_1.history.push('/home/index');
                }
            }, {
                title: '系统监控',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer/dashboard/analysis');
                }
            }, {
                title: '设计模块',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer/addon/design');
                }
            }, {
                title: '我的模块',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer/addon/mine');
                }
            }, {
                title: '退出登录',
                onClick: () => {
                    return login_1.default.logout();
                }
            }];
        this.lefts = [{
                title: '模块管理',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer/manager/home');
                }
            }, {
                title: '服务管理',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer/services');
                }
            }, {
                title: 'IMS联盟',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer/union/home');
                }
            }, {
                title: '模块市场',
                onClick: () => {
                    ims_adminer_1.history.push('/adminer/shop/home');
                }
            }];
        this.collapsed = !!ims_util_1.default.store.get('adminer:collapsed');
        this.setCollapsedIcon();
    }
    setCollapsed(collapsed) {
        if (typeof collapsed === 'boolean') {
            this.collapsed = !!collapsed;
        }
        else {
            collapsed = !this.collapsed;
            this.collapsed = collapsed;
        }
        this.setCollapsedIcon();
        ims_util_1.default.store.set('adminer:collapsed', this.collapsed);
    }
    setCollapsedIcon(icon) {
        if (icon) {
            this.collapsedIcon = icon;
        }
        else {
            if (this.collapsed) {
                this.collapsedIcon = 'menu-unfold';
            }
            else {
                this.collapsedIcon = 'menu-fold';
            }
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AdminerLayout.prototype, "logo", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AdminerLayout.prototype, "sider", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], AdminerLayout.prototype, "collapsed", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AdminerLayout.prototype, "collapsedIcon", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AdminerLayout.prototype, "copyright", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], AdminerLayout.prototype, "menus", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], AdminerLayout.prototype, "lefts", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], AdminerLayout.prototype, "setCollapsed", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminerLayout.prototype, "setCollapsedIcon", null);
exports.AdminerLayout = AdminerLayout;
exports.default = new AdminerLayout();
