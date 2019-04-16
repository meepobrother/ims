import React = require('react');
import { Form, Input, Button, List, Card } from 'antd';
const btn: any = {};
import { observer, inject } from 'mobx-react';
import { Add } from './store'
import "./add.less";
@inject('add')
@observer
export default class Index extends React.Component<{ add?: Add }, any> {
    render() {
        const { add } = this.props;
        return <div className="ims-cluster-home-add">
            <Card hoverable title="添加服务" className="add-view">
                <Form>
                    <Form.Item>
                        <Input onChange={e => add.setName(e.target.value)} placeholder="服务名" />
                    </Form.Item>
                    <Form.Item>
                        <Input onChange={e => add.setPath(e.target.value)} placeholder="挂载路径" />
                    </Form.Item>
                    <h4>服务主机(右边添加)</h4>
                    <div className="add_upstream">
                        <List dataSource={add.upstream} renderItem={(item, index) => {
                            return <List.Item actions={[<a onClick={() => {
                                add.removeHost(index)
                                this.forceUpdate();
                            }}>删除</a>]}>
                                <div>{item.ip}:{item.port}</div>
                            </List.Item>
                        }}></List>
                    </div>
                    <Form.Item>
                        <Button onClick={() => add.addServer()} {...btn} type="primary">提交</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card hoverable title="添加主机" className="add-host">
                <Form>
                    <Form.Item>
                        <Input value={add.ip} onChange={(e) => add.setIp(e.target.value)} placeholder="ip地址" />
                    </Form.Item>
                    <Form.Item>
                        <Input value={add.port} onChange={(e) => add.setPort(e.target.value)} placeholder="端口号" />
                    </Form.Item>
                    <Form.Item>
                        <Button {...btn} onClick={() => add.addHost()}>添加</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    }
}