import React = require('react');
import { Form, Input, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import { Add } from './store';

@inject('add')
@observer
export default class Index extends React.Component<{ add?: Add }, any> {
    render() {
        const { add } = this.props;
        return <Modal
            onCancel={() => { add.switchModel() }}
            closable
            visible={add.modelVisible}
            okText="确定"
            cancelText="取消"
            title="添加主机"
            onOk={() => {
                add.addHost();
                this.forceUpdate();
            }}
        >
            <Form>
                <Form.Item>
                    <Input value={add.ip} onChange={(e) => add.setIp(e.target.value)} placeholder="ip地址" />
                </Form.Item>
                <Form.Item>
                    <Input value={add.port} onChange={(e) => add.setPort(e.target.value)} placeholder="端口号" />
                </Form.Item>
            </Form>
        </Modal>
    }
}