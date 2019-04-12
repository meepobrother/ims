import React, { Component } from 'react'
import { ImsRoutes, IRouter } from 'ims-adminer';
import { Layout } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

export default class Index extends Component<{ route: IRouter }, any> {
    render() {
        return <Layout>
            <Layout.Sider style={{ backgroundColor: 'rgb(74, 157, 189)' }} collapsed></Layout.Sider>
            <Layout>
                <Layout.Content style={{ height: '100vh' }}>
                    <ImsRoutes route={this.props.route}></ImsRoutes>
                </Layout.Content>
            </Layout>
            <Layout.Sider style={{ backgroundColor: 'rgb(74, 157, 189)' }}></Layout.Sider>
        </Layout >
    }
}
