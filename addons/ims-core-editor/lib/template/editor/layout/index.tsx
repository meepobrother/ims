import React, { Component } from 'react';
import { Layout, Icon, Dropdown, Avatar, Input, Button } from 'antd';
import { Link } from 'ims-adminer';
import "./index.less";
import { observer, inject } from 'mobx-react'
import ImsEditor from '../../store/index'
@inject('editor')
@observer
export default class Index extends Component<{ editor?: ImsEditor, type: 'markdown' | 'rich' }> {
    switchEditor() {
        const { type } = this.props;
        if (type === 'markdown') {
            return <Link className="toogle-select" to={'/ims-core-editor/editor/rich'}>
                <Icon type="swap" />
            </Link>
        } else {
            return <Link className="toogle-select" to={'/ims-core-editor/editor/markdown'}>
                <Icon type="swap" />
            </Link>
        }
    }
    render() {
        const btnProps: any = {
            onClick: () => this.props.editor.publish(),
            type: "primary"
        };
        return <Layout className="ims-core-editor">
            <Layout.Header style={{ backgroundColor: '#fff' }} className="header">
                <div className="header-left"></div>
                <Input placeholder="请输入标题..." />
                <div className="header-right">
                    <div className="status-text">
                        文章将会自动保存至
                        <Link to={'/ims-core-editor/drafts'}>草稿</Link>
                    </div>
                    <div className="image-select">
                        <Icon type="picture" />
                    </div>
                    {this.switchEditor()}
                    <Dropdown trigger={['click']} overlay={<div className="ims-core-editor-panel">
                        <Button {...btnProps}>发布</Button>
                    </div>}>
                        <a className="btn-publish" href="javascript:;">
                            发布 <Icon type="down" />
                        </a>
                    </Dropdown>
                    <Dropdown placement="bottomLeft" trigger={['hover']} overlay={<div>overlay</div>}>
                        <Avatar className="user-avatar" shape="circle" />
                    </Dropdown>
                </div>
            </Layout.Header>
            <Layout.Content className="main">
                {this.props.children}
            </Layout.Content>
        </Layout>
    }
}