import React = require('react');
import ImsHomeLayout from '../../../store/homeLayout';
import ImsHomeLogin from '../../../store/login';
import "./index.less";
export default class Index extends React.Component<{
    homeLayout?: ImsHomeLayout;
    login?: ImsHomeLogin;
}, any> {
    render(): JSX.Element;
    renderHeaderRightMenu(): JSX.Element | JSX.Element[];
}
