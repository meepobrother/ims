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
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class ImsApp {
    constructor() {
        this.role = 'default';
    }
    setRole(role) {
        this.role = role;
    }
    setNickname(nickname) {
        this.nickname = nickname;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsApp.prototype, "uid", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsApp.prototype, "role", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsApp.prototype, "avatar", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsApp.prototype, "nickname", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsApp.prototype, "token", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsApp.prototype, "refreshToken", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsApp.prototype, "platform", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImsApp.prototype, "setRole", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImsApp.prototype, "setNickname", null);
exports.ImsApp = ImsApp;
