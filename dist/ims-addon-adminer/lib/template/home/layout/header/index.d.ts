import React = require('react');
import { HomeLayout as ImsHomeLayout } from '../../../store/homeLayout';
import { Login as ImsHomeLogin } from '../../../store/login';
import "./index.less";
export default class Index extends React.Component<{
    homeLayout?: ImsHomeLayout;
    login?: ImsHomeLogin;
}, any> {
    render(): JSX.Element;
    renderHeaderRightMenu(): JSX.Element | JSX.Element[];
}
