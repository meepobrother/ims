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
const mobx_react_1 = require("mobx-react");
let Index = class Index extends React.Component {
    render() {
        const { add } = this.props;
        return <antd_1.Modal onCancel={() => { add.switchModel(); }} closable visible={add.modelVisible} okText="确定" cancelText="取消" title="添加主机" onOk={() => {
            add.addHost();
            this.forceUpdate();
        }}>
            <antd_1.Form>
                <antd_1.Form.Item>
                    <antd_1.Input value={add.ip} onChange={(e) => add.setIp(e.target.value)} placeholder="ip地址"/>
                </antd_1.Form.Item>
                <antd_1.Form.Item>
                    <antd_1.Input value={add.port} onChange={(e) => add.setPort(e.target.value)} placeholder="端口号"/>
                </antd_1.Form.Item>
            </antd_1.Form>
        </antd_1.Modal>;
    }
};
Index = __decorate([
    mobx_react_1.inject('add'),
    mobx_react_1.observer
], Index);
exports.default = Index;
