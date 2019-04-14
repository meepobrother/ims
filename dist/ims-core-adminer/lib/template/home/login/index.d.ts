import React = require('react');
import "./index.less";
import LoginStore from '../../store/login';
import LoginCookie from '../../store/cookie';
export default class LoginPage extends React.Component<{
    login: LoginStore;
    cookie: LoginCookie;
}> {
    renderNotice(): JSX.Element;
    render(): JSX.Element;
}
