import { Component } from 'react';
import React = require('react');

import { Layout, Menu } from 'antd'
import { ImsRoutes, IRouter, Link } from 'ims-adminer'
// 个人资料
import "./index.less";
export default class Index extends Component<{
    route: IRouter
}, any> {
    render() {
        const { route } = this.props;
        return <Layout>
            <Layout.Sider>
                <Menu >
                    {route && route.routes.map((route, key) => {
                        return <Menu.Item title={route.name} key={key}>
                            <Link to={route.path}>
                                {route.name}
                            </Link>
                        </Menu.Item>
                    })}
                </Menu>
            </Layout.Sider>
            <Layout.Content>
                <ImsRoutes route={route} />
            </Layout.Content>
        </Layout>
    }
}