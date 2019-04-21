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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const ims_model_1 = require("ims-model");
const ims_node_1 = require("ims-node");
const ims_common_1 = require("ims-common");
let ImsCoreAdminerUser = class ImsCoreAdminerUser {
    async login(msg) {
        const { username, password } = msg;
        try {
            const user = await this.user.findOne({
                username: username
            });
            if (!user) {
                return {
                    code: -1,
                    message: '用户不存在或已注销'
                };
            }
            else {
                if (ims_node_1.isEqualPassword(password, user.token, user.password)) {
                    const config = ims_common_1.getConfig();
                    let role = 'default';
                    if (config.admin.includes(user.id)) {
                        role = 'admin';
                    }
                    else {
                        role = 'manager';
                    }
                    return {
                        code: 0,
                        message: '登录成功',
                        data: {
                            username: user.username,
                            role,
                            token: ims_node_1.sign({
                                id: user.id,
                                username: user.username,
                                role
                            })
                        }
                    };
                }
                else {
                    return {
                        code: -1,
                        message: '账户名或密码错误'
                    };
                }
            }
        }
        catch (e) {
            return {
                code: -1,
                message: e.message,
                stack: e.stack
            };
        }
    }
    async getRole(req) {
        ims_node_1.verify((user) => {
            console.log(user);
            return true;
        });
        const user = req.user || {};
        // 返回角色和用户名
        return {
            role: user.role,
            username: user.username,
            headers: req.headers
        };
    }
};
__decorate([
    ims_core_1.EntityRepository({
        target: ims_model_1.ImsUserEntity,
        db: 'system'
    }),
    __metadata("design:type", Object)
], ImsCoreAdminerUser.prototype, "user", void 0);
__decorate([
    ims_core_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ImsCoreAdminerUser.prototype, "login", null);
__decorate([
    ims_core_1.Get(),
    __param(0, ims_core_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImsCoreAdminerUser.prototype, "getRole", null);
ImsCoreAdminerUser = __decorate([
    ims_core_1.Controller({
        path: '/user'
    })
], ImsCoreAdminerUser);
exports.ImsCoreAdminerUser = ImsCoreAdminerUser;
