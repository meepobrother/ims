import { observable, action } from 'mobx';
import React = require('react');
import util from 'ims-util';
import { history, role } from 'ims-adminer'
export class Login {
    // 记住
    @observable
    autoLogin: boolean = true;

    // 提醒消息
    @observable
    notice: string = '';

    // 当前激活tab
    @observable
    tab: 'account' | 'mobile' = 'account';

    constructor() {
        const token = util.cookie.get('token')
        if (token) {
            util.http.get('/user/getRole').then(res => {
                const user = res.data;
                role.setRole(user.role)
                role.setUsername(user.username);
            });
        }
    }

    // ui 设置
    @observable
    setting: any = {
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
            onSubmit: (err: Error, values: any) => {
                if (err) return this.setNotice(err.message);
                this.login({
                    ...values,
                    autoLogin: this.autoLogin
                }).then(res => {
                    const { data } = res;
                    if (data.code + '' !== '0') {
                        this.setNotice(data.message)
                    } else {
                        // 跳转
                        const user = data.data;
                        role.setRole(user.role);
                        role.username = user.username;
                        util.cookie.set('token', user.token)
                        history.push('/home/index')
                    }
                }).catch(e => {
                    this.setNotice(e.message)
                })
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

    // 设置自动登录
    @action
    setAutoLogin(e: boolean) {
        this.autoLogin = e;
    }
    // 切换tab
    @action
    setTab(key: 'account' | 'mobile') {
        this.tab = key;
    }
    // 设置提醒
    @action
    setNotice(notice: string) {
        this.notice = notice;
    }
    /**
     * 登录
     */
    login(data: any) {
        return util.http.post('/user/login', data)
    }
    /**
     * 退出登录
     **/
    logout() {
        role.role = 'default';
        role.username = '';
        util.cookie.remove('token')
        history.push('/home/login')
    }
    /**
     * 注册
     */
    register() {
    }
}

export default new Login();