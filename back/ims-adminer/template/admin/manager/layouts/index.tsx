import React, { Component } from 'react';
import { Layout } from 'antd';
import { ImsRoutes, IRouter } from 'ims-adminer'
import './index.less';
export default class Index extends Component<{ route: IRouter }, any> {
    render() {
        return <Layout className="ims-adminer-manager-layout">
            <Layout.Sider defaultCollapsed={true}></Layout.Sider>
            <Layout>
                <Layout.Content>
                    <ImsRoutes route={this.props.route}></ImsRoutes>
                </Layout.Content>
            </Layout>
        </Layout>
    }
}