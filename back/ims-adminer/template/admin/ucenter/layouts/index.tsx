import { Component } from 'react';
import React = require('react');

import { ImsRoutes, IRouter, Link } from 'ims-adminer'
import { Layout, Menu } from 'antd'
import "./index.less";
export default class Index extends Component<{ route: IRouter }, any> {
    render() {
        const { route } = this.props;
        return <Layout className="ims-ucenter">
            <Layout.Sider className="ims-ucenter-sider">
                <div className="ims-ucenter-left">
                    <div className="ims-ucenter-left-header">
                        <div className="avatar"></div>
                        <div className="username">imeepos</div>
                    </div>
                    <div className="ims-ucenter-left-list">
                        <Menu theme="dark">
                            {route.routes && route.routes.map((route, key) => {
                                return <Menu.Item>
                                    <Link key={key} to={route.path}>{route.name}</Link>
                                </Menu.Item>
                            })}
                        </Menu>
                    </div>
                </div>
            </Layout.Sider>
            <Layout.Content className="ims-ucenter-layout">
                <div className="ims-ucenter-right">
                    <ImsRoutes route={route} />
                </div>
            </Layout.Content>
        </Layout>
    }
}
