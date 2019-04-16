import React = require('react');
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { List, Card, Drawer, Form, Input, Button, Modal } from 'antd'
const header: any = {};
import './index.less';

import { inject, observer } from 'mobx-react';
import { ClusterHome } from './store'
const btn: any = {};
@inject('home')
@observer
export default class Index extends React.Component<{ home?: ClusterHome }, any> {
    render() {
        const { home } = this.props;
        return <div className="ims-adminer-manager-home-page">
            <PageHeader {...header}
                title="集群管理"
                wide={true}
                action={
                    <div>
                        <a href="javascript:;" onClick={() => home.switchDrawer()}>添加服务</a>
                        &nbsp;
                        <a href="javascript:;" onClick={() => home.switchDrawer()}>服务市场</a>
                    </div>
                }
                content={
                    <div>
                        <p>
                            集群可以将多台服务器联合提供服务，已达到实际业务中的并发需求!
                        </p>
                    </div>
                }
            >
            </PageHeader>
            <div className="main">
                <List
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={home.list}
                    renderItem={(item) => {
                        return <List.Item>
                            <Card hoverable actions={[
                                <a>编辑</a>,
                                <a>移除</a>
                            ]}>
                                localhost:4200
                        </Card>
                        </List.Item>
                    }}></List>
            </div>
            <Drawer
                title="添加服务"
                placement="right"
                closable
                onClose={() => home.switchDrawer()}
                visible={!!home.drawerVisible}
            >
                <Form>
                    <Form.Item>
                        <Input value={home.currentServer.name} onChange={e => home.setCurrentServerName(e.target.value)} placeholder="服务名" />
                    </Form.Item>
                    <Form.Item>
                        <Input value={home.currentServer.path} onChange={e => home.setCurrentServerPath(e.target.value)} placeholder="挂载路径" />
                    </Form.Item>
                    <h4>主机</h4>
                    <div className="add_upstream">
                        <a onClick={() => home.switchModel()}>添加</a>
                    </div>
                    <Form.Item>
                        <Button onClick={() => home.addServer()} {...btn} type="primary">提交</Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Modal
                onCancel={() => { home.switchModel() }}
                closable
                visible={home.modelVisible}
                okText="确定"
                cancelText="取消"
                title="添加主机"
                onOk={() => home.addHost()}
            >
                <Form>
                    <Form.Item>
                        <Input value={home.ip} onChange={(e) => home.setIp(e.target.value)} placeholder="ip" />
                    </Form.Item>
                    <Form.Item>
                        <Input value={home.port} onChange={(e) => home.setPort(e.target.value)} placeholder="端口号" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    }
}
