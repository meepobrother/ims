import { observer } from 'mobx-react'
import React = require('react');
import { Layout } from 'antd';
import Header from './header'
import Footer from './footer'
import { ImsRoutes } from 'ims-adminer'
import "./index.less";

@observer
export default class Index extends React.Component<any, any> {
    componentDidMount() { }
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
