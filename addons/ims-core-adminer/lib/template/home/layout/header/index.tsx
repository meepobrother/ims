import { observer, inject } from 'mobx-react'
import React = require('react');
import { Layout, Menu } from 'antd';
import { Link } from 'ims-adminer'
import ImsHomeLayout from '../../../store/homeLayout'
import "./index.less";

@inject('homeLayout')
@observer
export default class Index extends React.Component<{ homeLayout?: ImsHomeLayout }, any> {
    render() {
        const { homeLayout } = this.props;
        return <Layout.Header className="home-header">
            <div className="header-logo">
                <img src={homeLayout.logo} height={45} alt="" />
            </div>
            <Menu className="header-left-menu" mode="horizontal" style={{ height: '64px', lineHeight: '64px' }} theme="dark">
                {homeLayout.left.map(it => {
                    return <Menu.Item key={it.href}>
                        <Link to={it.href}>{it.title}</Link>
                    </Menu.Item>
                })}
            </Menu>
            <div className="header-right-menu">
                {homeLayout.right.map(it => {
                    return <Link key={it.href} to={it.href}>{it.title}</Link>
                })}
            </div>
        </Layout.Header>
    }
}
