import React = require('react');
import { Layout, Menu } from 'antd';
import { ImsRoutes } from 'ims-adminer'
import "./index.less"
import Header from './header'
import { observer, inject } from 'mobx-react'
import { AdminerLayout } from '../../store/adminerLayout'
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter'
@inject('adminerLayout')
@observer
export default class Index extends React.Component<{ adminerLayout: AdminerLayout, route: any }, any> {
    render() {
        const { adminerLayout } = this.props;
        return <Layout className="ims-adminer-layout">
            <Layout.Sider collapsed={adminerLayout.collapsed} className="layout-sider">
                <div className="ucenter"></div>
                <Menu theme="dark">
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>首页</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content className="layout-content">
                <Layout>
                    <Layout.Header className="layout-header">
                        <Header />
                    </Layout.Header>
                    <Layout.Content className="main">
                        <ImsRoutes route={this.props.route} />
                        <GlobalFooter copyright={adminerLayout.copyright} />
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    }
}