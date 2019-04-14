import React = require('react');
import { Layout, Button, Card, Menu } from 'antd'
import "./index.less";
import { observer } from 'mobx-react'
import AddonList from '../store/addon-list';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter'
import logo from './logo-light.png'
import { Link } from 'react-router-dom';
@observer
export default class Index extends React.Component<{ addonList: AddonList }, any> {
    componentDidMount() { }
    render() {
        const gridProps: any = {
            style: {
                width: '25%',
                textAlign: 'center',
            }
        };

        const installProps: any = {
            style: {
                color: '#fff'
            }
        };

        return <Layout className="ims-adminer">
            <Layout.Header className="home-header">
                <div className="header-logo">
                    <img src={logo} height={45} alt="" />
                </div>
                <Menu className="header-left-menu" mode="horizontal" style={{ height: '64px', lineHeight: '64px' }} theme="dark">
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>安装</Menu.Item>
                    <Menu.Item>新闻</Menu.Item>
                    <Menu.Item>产品</Menu.Item>
                </Menu>
                <div className="header-right-menu">
                    <Link to={'/login'}>登录</Link>
                    <Link to={'/register'}>注册</Link>
                </div>
            </Layout.Header>
            <Layout.Content className="ims-home-layout-content">
                <div className="home-banner">
                    <div className="bg"></div>
                    <div className="home-banner-wrapper">
                        <p className="desc">区块链联合运营框架</p>
                        <Button type="ghost" {...installProps}>立即安装</Button>
                    </div>
                </div>
                <div className="main">
                    <h2 className="title">系统功能</h2>
                    <Card>
                        <Card.Grid {...gridProps}>即时通讯</Card.Grid>
                        <Card.Grid {...gridProps}>在线更新</Card.Grid>
                        <Card.Grid {...gridProps}>生态系统</Card.Grid>
                        <Card.Grid {...gridProps}>安全防护</Card.Grid>
                        <Card.Grid {...gridProps}>售后服务</Card.Grid>
                        <Card.Grid {...gridProps}>联合运营</Card.Grid>
                        <Card.Grid {...gridProps}>模块化</Card.Grid>
                        <Card.Grid {...gridProps}>在线更新</Card.Grid>
                    </Card>
                </div>
                <GlobalFooter
                    links={[{
                        title: '关于我们',
                        href: '/about'
                    }, {
                        title: '联系我们',
                        href: '/concat'
                    }]}
                    copyright={<div>'powser by 杭州米波网络科技有限公司'</div>}
                ></GlobalFooter>
            </Layout.Content>
        </Layout>
    }
}
