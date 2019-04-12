import React, { Component } from 'react';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { Icon, Breadcrumb } from 'antd';
export default class Index extends Component {
    render() {
        return <div>
            <PageHeader
                title="用户管理"
                action={<div><Icon type="user"></Icon></div>}
                logo={<div><Icon type="user"></Icon></div>}
                breadcrumbList={[{
                    title: '测试',
                    href: '/adminer'
                }, {
                    title: '测试',
                    href: '/adminer'
                }]}
                home={<div>home</div>}
                tabList={[{
                    key: 'list',
                    tab: <div>用户列表</div>
                }, {
                    key: 'add',
                    tab: <div>添加用户</div>
                }, {
                    key: 'group',
                    tab: <div>用户分组</div>
                }]}
                content={<div>content</div>}
                extraContent={<div>extraContent</div>}
                tabBarExtraContent={<div>tabBarExtraContent</div>}
                itemRender={(item) => {
                    return <div></div>
                }}></PageHeader>
            <Breadcrumb style={{ display: 'none' }} />
        </div>
    }
}