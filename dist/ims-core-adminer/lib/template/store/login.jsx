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
const React = require("react");
const ims_util_1 = __importDefault(require("ims-util"));
class Login {
    constructor() {
        // 记住
        this.autoLogin = true;
        // 提醒消息
        this.notice = '';
        // 当前激活tab
        this.tab = 'account';
        // 从什么地方进入登录的
        this.from = '/home';
        // 角色
        this.role = 'default';
        // ui 设置
        this.setting = {
            account: {
                key: 'account',
                tab: <span>账号密码</span>,
                username: {
                    rules: [],
                    name: 'username',
                    placeholder: '请输入用户名'
                },
                password: {
                    rules: [],
                    name: 'password',
                    placeholder: '请输入密码'
                }
            },
            mobile: {
                key: 'mobile',
                tab: <span>手机号</span>,
                mobile: {
                    rules: [{
                            required: true,
                            message: '请输入手机号码!'
                        }, {
                            pattern: /^1\d{10}$/,
                            message: '手机号码格式错误!'
                        }],
                    name: "mobile",
                    placeholder: "请输入手机号码"
                },
                captcha: {
                    onGetCaptcha: () => console.log('Get captcha!'),
                    getCaptchaSecondText: "重发",
                    getCaptchaButtonText: "发送",
                    placeholder: "请输入验证码",
                    name: "captcha"
                }
            },
            submit: {
                title: '立即登录',
                onSubmit: (err, values) => {
                    if (err)
                        return this.setNotice(err.message);
                    this.login({
                        ...values,
                        autoLogin: this.autoLogin
                    }).then(res => {
                        const { data } = res;
                        if (data.code + '' !== '0') {
                            this.setNotice(data.message);
                        }
                        else {
                            // 跳转
                            const user = data.data;
                            this.role = user.role;
                            ims_util_1.default.cookie.set('token', user.token);
                        }
                    }).catch(e => {
                        this.setNotice(e.message);
                    });
                }
            },
            autoLogin: {
                value: true,
                title: '记住'
            },
            forget: {
                title: '忘记密码',
                to: '/forget'
            },
            register: {
                to: '/register',
                title: '注册'
            }
        };
    }
    // 设置自动登录
    setAutoLogin(e) {
        this.autoLogin = e;
    }
    // 切换tab
    setTab(key) {
        this.tab = key;
    }
    // 设置提醒
    setNotice(notice) {
        this.notice = notice;
    }
    /**
     * 登录
     */
    login(data) {
        return ims_util_1.default.http.post('/user/login', data);
    }
    /**
     * 退出登录
     **/
    logout() {
        ims_util_1.default.cookie.remove('token');
    }
    /**
     * 注册
     */
    register() {
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], Login.prototype, "autoLogin", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Login.prototype, "notice", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Login.prototype, "tab", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Login.prototype, "from", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Login.prototype, "role", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Login.prototype, "setting", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], Login.prototype, "setAutoLogin", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Login.prototype, "setTab", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Login.prototype, "setNotice", null);
exports.default = Login;
