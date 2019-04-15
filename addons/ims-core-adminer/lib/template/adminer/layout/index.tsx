import React = require('react');
import { Layout, Menu } from 'antd';
import { ImsRoutes } from 'ims-adminer'
import "./index.less"
import Header from './header'
export default class Index extends React.Component<any, any> {
    render() {
        return <Layout className="ims-adminer-layout">
            <Layout.Sider className="layout-sider">
                <div className="ucenter"></div>
                <Menu>
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
                    <Layout.Content>
                        <ImsRoutes route={this.props.route} />
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    }
}