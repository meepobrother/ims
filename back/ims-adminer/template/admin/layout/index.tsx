import React, { Component } from 'react';
import { ImsRoutes, IRouter } from 'ims-adminer';
import { Layout } from 'antd';
import Header from './header'
import "./index.less";
import { observer } from 'mobx-react'

@observer
export default class Index extends Component<{ route: IRouter, store: any }, any> {
    render() {
        return <React.Fragment>
            <Layout className="ims-adminer-layout">
                <Header />
                <Layout.Content className="ims-adminer-layout-content">
                    <ImsRoutes route={this.props.route} />
                </Layout.Content>
            </Layout>
        </React.Fragment>
    }
}
