import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox, Icon } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
import "./index.less";
import { observer, inject } from 'mobx-react';
import LoginStore from '../store/login'
@inject('login')
@observer
export default class LoginPage extends React.Component<{ login: LoginStore }> {
    renderNotice() {
        const { login } = this.props;
        if (login.notice && login.notice.length > 0) {
            return <Alert
                style={{ marginBottom: 24 }}
                message={login.notice}
                type="error"
                showIcon
                closable
            />
        }
    }
    render() {
        const { login } = this.props;
        const { account, mobile, submit, autoLogin, forget, register } = login.setting;
        const { username, password } = account;
        const { mobile: InputMobile, captcha } = mobile;
        return (
            <div className="login-warp">
                <Login
                    defaultActiveKey={login.tab}
                    onTabChange={(key: any) => login.setTab(key)}
                    onSubmit={submit.onSubmit}>
                    <Tab key={account.key} tab={account.tab}>
                        {this.renderNotice()}
                        <UserName {...username} />
                        <Password {...password} />
                    </Tab>
                    <Tab key={mobile.key} tab={mobile.tab}>
                        <Mobile {...InputMobile} />
                        <Captcha {...captcha} />
                    </Tab>
                    <div>
                        <Checkbox name="autoLogin" checked={login.autoLogin} onChange={e => login.setAutoLogin(!!e.target.checked)}>{autoLogin.title}</Checkbox>
                        <Link style={{ float: 'right' }} to={forget.to}>
                            {forget.title}
                        </Link>
                    </div>
                    <Submit>{submit.title}</Submit>
                    <div className="login-other-way">
                        <Icon type="alipay" />
                        <Icon type="taobao" />
                        <Icon type="weibo" />
                        <Link style={{ float: 'right' }} to={register.to}>
                            {register.title}
                        </Link>
                    </div>
                </Login>
            </div>
        );
    }
}