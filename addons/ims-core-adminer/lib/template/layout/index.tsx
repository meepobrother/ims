import React = require('react');
import { ImsRoutes } from 'ims-adminer';
import Header from '../home/layout/header'
import Footer from '../home/layout/footer'
import { Layout } from 'antd';
import "./index.less";

export default class Index extends React.Component<any, any> {
    render() {
        return <Layout className="ims-home-layout">
            <Header />
            <Layout.Content className="layout-content">
                <ImsRoutes route={this.props.route} />
                <Footer />
            </Layout.Content>
        </Layout>
    }
}