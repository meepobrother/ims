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
class ImsRole {
    constructor() {
        /** 角色 */
        this.role = 'default';
        /** 用户名 */
        this.username = '';
        /** 头像 */
        this.avatar = '';
        /** 手机号 */
        this.mobile = '';
        /** 邮箱 */
        this.email = '';
        /** 微信openid */
        this.openid = '';
    }
    /** 设置role */
    setRole(role) {
        this.role = role;
    }
    /** 设置用户名 */
    setUsername(username) {
        this.username = username;
    }
    /** 设置头像 */
    setAvatar(avatar) {
        this.avatar = avatar;
    }
    autoLogin() {
        const token = ims_util_1.default.cookie.get('token');
        if (token) {
            return ims_util_1.default.http.get('/user/getRole').then(res => {
                const user = res.data;
                this.setRole(user.role);
                this.setUsername(user.username);
            }).catch(res => {
                this.setRole('default');
            });
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsRole.prototype, "role", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsRole.prototype, "username", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsRole.prototype, "avatar", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsRole.prototype, "mobile", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsRole.prototype, "email", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsRole.prototype, "openid", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImsRole.prototype, "setRole", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImsRole.prototype, "setUsername", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImsRole.prototype, "setAvatar", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImsRole.prototype, "autoLogin", null);
exports.ImsRole = ImsRole;
exports.role = new ImsRole();
