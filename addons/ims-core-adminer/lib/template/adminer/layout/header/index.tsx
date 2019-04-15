import React = require('react')
import { Icon, Avatar, Dropdown, Menu } from 'antd';
import "./index.less";
import { observer, inject } from 'mobx-react'
import { AdminerLayout } from '../../../store/adminerLayout';
import { ImsRole } from 'ims-adminer'
@inject('adminerLayout', 'role')
@observer
export default class Index extends React.Component<{ adminerLayout?: AdminerLayout, role?: ImsRole }, any> {
    render() {
        const { adminerLayout, role } = this.props;
        const overlay = <Menu>
            <Menu.Item>设计</Menu.Item>
        </Menu>
        return <div className="ims-global-header">
            <span className="global-header-index-trigger" onClick={() => adminerLayout.setCollapsed()}>
                <Icon type={adminerLayout.collapsedIcon} />
            </span>
            <div className="global-header-index-right">
                <Dropdown className="username" trigger={['hover']} overlay={overlay}>
                    <div className="username-wrapper">
                        <Avatar className="avatar" src={role.avatar} />
                        <span>{role.username}</span>
                    </div>
                </Dropdown>
            </div>
        </div>
    }
}
