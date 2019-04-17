"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const antd_1 = require("antd");
const btn = {};
const mobx_react_1 = require("mobx-react");
require("./add.less");
let Index = class Index extends React.Component {
    render() {
        const { add } = this.props;
        return <div className="ims-cluster-home-add">
            <antd_1.Card hoverable title="添加服务" className="add-view">
                <antd_1.Form>
                    <antd_1.Form.Item>
                        <antd_1.Input value={add.name} onChange={e => add.setName(e.target.value)} placeholder="服务名"/>
                    </antd_1.Form.Item>
                    <antd_1.Form.Item>
                        <antd_1.Input value={add.path} onChange={e => add.setPath(e.target.value)} placeholder="挂载路径"/>
                    </antd_1.Form.Item>
                    <h4>服务主机(右边添加)</h4>
                    <div className="add_upstream">
                        <antd_1.List dataSource={add.upstream} renderItem={(item, index) => {
            return <antd_1.List.Item actions={[<a onClick={() => {
                    add.removeHost(index);
                    this.forceUpdate();
                }}>删除</a>]}>
                                <div>{item.ip}:{item.port}</div>
                            </antd_1.List.Item>;
        }}></antd_1.List>
                    </div>
                    <antd_1.Form.Item>
                        <antd_1.Button onClick={() => add.addServer()} {...btn} type="primary">提交</antd_1.Button>
                    </antd_1.Form.Item>
                </antd_1.Form>
            </antd_1.Card>
            <antd_1.Card hoverable title="添加主机" className="add-host">
                <antd_1.Form>
                    <antd_1.Form.Item>
                        <antd_1.Input value={add.ip} onChange={(e) => add.setIp(e.target.value)} placeholder="ip地址"/>
                    </antd_1.Form.Item>
                    <antd_1.Form.Item>
                        <antd_1.Input value={add.port} onChange={(e) => add.setPort(e.target.value)} placeholder="端口号"/>
                    </antd_1.Form.Item>
                    <antd_1.Form.Item>
                        <antd_1.Button {...btn} onClick={() => add.addHost()}>添加</antd_1.Button>
                    </antd_1.Form.Item>
                </antd_1.Form>
            </antd_1.Card>
        </div>;
    }
};
Index = __decorate([
    mobx_react_1.inject('add'),
    mobx_react_1.observer
], Index);
exports.default = Index;
