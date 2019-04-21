import React = require('react');
import "./index.less";
import { AdminerLayout } from '../../store/adminerLayout';
export default class Index extends React.Component<{
    adminerLayout: AdminerLayout;
    route: any;
}, any> {
    render(): JSX.Element;
}
