import { Component } from 'react';
import React = require('react');
import { ImsRoutes, IRouter, Link } from 'ims-adminer'
import { Layout, Menu } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import "./index.less";
import ImsAdminerRouter from '../../../store/router';
export default class Index extends Component<{ route: IRouter, imsAdminerRouter: ImsAdminerRouter }, any> {
    filterLeftMenu() {
        let { routes } = this.props.route
        routes = routes || [];
        return routes.filter(it => {
            return !(it.path.includes('login') || it.path.includes('register') || it.path.includes('forget'))
        })
    }
    filterRightMenu() {
        let { routes } = this.props.route
        routes = routes || [];
        return routes.filter(it => {
            return it.path.includes('login') || it.path.includes('register');
        })
    }

    render() {
        return <Layout>
            <Layout.Header style={{ padding: '0px' }} className="ims-website-header">
                <div className="logo">
                    <img src="" alt="" />
                </div>
                <Menu selectable={false} mode="horizontal" className="ims-website-header-left">
                    {this.filterLeftMenu().map((route, key) => {
                        return <Menu.Item key={key}>
                            <Link to={route.path}>
                                {route.name}
                            </Link>
                        </Menu.Item>
                    })}
                </Menu>
                <Menu selectable={false} mode="horizontal" className="ims-website-header-right">
                    {this.filterRightMenu().map((route, key) => {
                        return <Menu.Item key={key}>
                            <Link to={route.path}>
                                {route.name}
                            </Link>
                        </Menu.Item>
                    })}
                </Menu>
            </Layout.Header>
            <Layout.Content>
                <ImsRoutes route={this.props.route}></ImsRoutes>
            </Layout.Content>
            <GlobalFooter copyright="Power By 杭州米波网络科技有限公司"></GlobalFooter>
        </Layout>
    }
}