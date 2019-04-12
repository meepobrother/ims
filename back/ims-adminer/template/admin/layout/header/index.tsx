import React, { Component } from 'react';
import { Layout, Avatar, Icon, Input, Select, Menu, Dropdown, Tabs } from 'antd'
import './index.less';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Link } from 'ims-adminer';
import util from 'ims-util'
const ucenter = util.router.get('/adminer/ucenter')
export default class Index extends Component {
    drownMenu() {
        return <Menu>
            {ucenter.routes.map(route => {
                return <Menu.Item className="ims-adminer-header-drown-menu-item">
                    <Link to={route.path}>
                        <Icon type={route.icon} />
                        {route.name}
                    </Link>
                </Menu.Item>
            })}
            <Menu.Divider></Menu.Divider>
            <Menu.Item className="ims-adminer-header-drown-menu-item">
                <Icon type="logout" />
                退出登录
            </Menu.Item>
        </Menu>
    }
    render() {
        return <Layout.Header style={{ padding: '0px' }}>
            <div className="ims-adminer-header">
                <div className="ims-adminer-header-left">
                    <div className="logo">
                        <img src="./" alt="" />
                    </div>
                    <Menu className="ims-adminer-header-left-menu" mode="horizontal">
                        <Menu.Item>
                            <Link to="/adminer/home">
                                <Icon type="home" />首页
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/adminer/shell">
                                <Icon type="fund" />监控
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/adminer/user">
                                <Icon type="user" />用户
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/adminer/addons">
                                <Icon type="appstore" />应用
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/adminer/system">
                                <Icon type="setting" />系统
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/adminer/share">
                                <Icon type="share-alt" />联盟
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="ims-adminer-header-right">
                    <HeaderSearch className={"ims-adminer-header-right-item"} placeholder={"请输入应用名称"}></HeaderSearch>
                    <Link className={"ims-adminer-header-right-item"} to="/adminer/help">
                        <Icon type="question-circle" />
                    </Link>
                    <NoticeIcon className={"ims-adminer-header-right-item"}>
                        <NoticeIcon.Tab title="提醒" locale={''} onClear={() => { }} onClick={() => { }} onViewMore={() => { }} />
                        <NoticeIcon.Tab title="待办" locale={''} onClear={() => { }} onClick={() => { }} onViewMore={() => { }} />
                        <NoticeIcon.Tab title="系统" locale={''} onClear={() => { }} onClick={() => { }} onViewMore={() => { }} />
                    </NoticeIcon>
                    <div className={"ims-adminer-header-right-user"} >
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <Dropdown overlay={() => this.drownMenu()} placement="bottomLeft">
                            <span className="ims-adminer-header-right-user-username">imeepos</span>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <Input style={{ display: 'none' }} />
            <Select style={{ display: 'none' }} />
            <Tabs style={{ display: 'none' }}>
                <Tabs.TabPane></Tabs.TabPane>
            </Tabs>
        </Layout.Header>
    }
}