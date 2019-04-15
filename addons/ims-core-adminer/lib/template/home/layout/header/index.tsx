import { observer, inject } from 'mobx-react'
import React = require('react');
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { Link, role } from 'ims-adminer'
import { HomeLayout as ImsHomeLayout } from '../../../store/homeLayout'
import { Login as ImsHomeLogin } from '../../../store/login'

import "./index.less";
@inject('homeLayout', 'role')
@observer
export default class Index extends React.Component<{
    homeLayout?: ImsHomeLayout,
    login?: ImsHomeLogin
}, any> {
    render() {
        const { homeLayout } = this.props;
        return <Layout.Header className="home-header">
            <div className="header-logo">
                <img src={homeLayout.logo} height={45} alt="" />
            </div>
            <div className="header-left-menu">
                {homeLayout.left.map(it => {
                    return <Link to={it.href}>{it.title}</Link>
                })}
            </div>
            <div className="header-right-menu">
                {this.renderHeaderRightMenu()}
            </div>
        </Layout.Header>
    }

    renderHeaderRightMenu() {
        const { homeLayout } = this.props
        if (role.username) {
            const userMenu = <Menu>
                {homeLayout.userMenus.map(menu => {
                    return <Menu.Item onClick={menu.onClick}>
                        {menu.title}
                    </Menu.Item>
                })}
            </Menu>
            return <Dropdown trigger={['click']} overlay={userMenu}>
                <div className="username">
                    <Avatar src={role.avatar} />
                    <span>{role.username}</span>
                </div>
            </Dropdown>
        } else {
            return homeLayout.right.map(it => {
                return <Link key={it.href} to={it.href}>{it.title}</Link>
            })
        }
    }
}

