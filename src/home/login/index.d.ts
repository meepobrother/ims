import React = require('react');
import "./index.less";
import { Login as LoginStore } from '../../store/login';
export default class LoginPage extends React.Component<{
    login: LoginStore;
}> {
    renderNotice(): JSX.Element;
    render(): JSX.Element;
}
