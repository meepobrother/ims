"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = __importDefault(require("ant-design-pro/lib/Login"));
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const React = require("react");
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login_1.default;
require("./index.less");
const mobx_react_1 = require("mobx-react");
let LoginPage = class LoginPage extends React.Component {
    renderNotice() {
        const { login } = this.props;
        if (login.notice && login.notice.length > 0) {
            return <antd_1.Alert style={{ marginBottom: 24 }} message={login.notice} type="error" showIcon closable/>;
        }
    }
    render() {
        const { login } = this.props;
        const { account, mobile, submit, autoLogin, forget, register } = login.setting;
        const { username, password } = account;
        const { mobile: InputMobile, captcha } = mobile;
        return (<div className="login-page">
                {login.role !== 'default' ? <react_router_dom_1.Redirect to={login.from}/> : ''}
                <div className="login-banner"></div>
                <div className="login-content">
                    <div className="login-warp">
                        <Login_1.default defaultActiveKey={login.tab} onTabChange={(key) => login.setTab(key)} onSubmit={submit.onSubmit}>
                            <Tab key={account.key} tab={account.tab}>
                                {this.renderNotice()}
                                <UserName {...username}/>
                                <Password {...password}/>
                            </Tab>
                            <Tab key={mobile.key} tab={mobile.tab}>
                                <Mobile {...InputMobile}/>
                                <Captcha {...captcha}/>
                            </Tab>
                            <div>
                                <antd_1.Checkbox name="autoLogin" checked={login.autoLogin} onChange={e => login.setAutoLogin(!!e.target.checked)}>{autoLogin.title}</antd_1.Checkbox>
                                <react_router_dom_1.Link style={{ float: 'right' }} to={forget.to}>
                                    {forget.title}
                                </react_router_dom_1.Link>
                            </div>
                            <Submit>{submit.title}</Submit>
                            <div className="login-other-way">
                                <antd_1.Icon type="alipay"/>
                                <antd_1.Icon type="taobao"/>
                                <antd_1.Icon type="weibo"/>
                                <react_router_dom_1.Link style={{ float: 'right' }} to={register.to}>
                                    {register.title}
                                </react_router_dom_1.Link>
                            </div>
                        </Login_1.default>
                    </div>
                    <div className="login-title">
                        微链
                        <p>开源免费区块链链框架</p>
                    </div>
                </div>
            </div>);
    }
};
LoginPage = __decorate([
    mobx_react_1.inject('login', 'cookie'),
    mobx_react_1.observer
], LoginPage);
exports.default = LoginPage;
