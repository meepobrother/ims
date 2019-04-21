"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Result_1 = __importDefault(require("ant-design-pro/lib/Result"));
const btn = {};
const antd_1 = require("antd");
const mobx_react_1 = require("mobx-react");
let Index = class Index extends React.Component {
    render() {
        const { design } = this.props;
        return <Result_1.default type="success" actions={<antd_1.Button {...btn} type="primary" onClick={() => design.finish()}>确认提交</antd_1.Button>} extra={<div>
            <div>模块代号：{design.name}</div>
            <div>模块名称：{design.title}</div>
            <div>版本号：{design.version}</div>
        </div>} title="模块设计完成"></Result_1.default>;
    }
};
Index = __decorate([
    mobx_react_1.inject('design'),
    mobx_react_1.observer
], Index);
exports.default = Index;
