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
const antd_1 = require("antd");
require("./index.less");
const mobx_react_1 = require("mobx-react");
const base_1 = __importDefault(require("./base"));
const incs_1 = __importDefault(require("./incs"));
const typeorm_1 = __importDefault(require("./typeorm"));
const template_1 = __importDefault(require("./template"));
const finish_1 = __importDefault(require("./finish"));
let Index = class Index extends React.Component {
    render() {
        const { design } = this.props;
        return <div className="ims-design-page">
            <antd_1.Card title="设计模块" actions={design.step < 4 ? [<antd_1.Button {...design.prevBtn.props} loading={design.loading}>{design.prevBtn.title}</antd_1.Button>, <antd_1.Button {...design.nextBtn.props} loading={design.loading} type="primary">{design.nextBtn.title}</antd_1.Button>] : []}>
                <antd_1.Steps current={design.step}>
                    <antd_1.Steps.Step title="基础信息"/>
                    <antd_1.Steps.Step title="接口信息"/>
                    <antd_1.Steps.Step title="数据信息"/>
                    <antd_1.Steps.Step title="模板信息"/>
                    <antd_1.Steps.Step title="完成"/>
                </antd_1.Steps>
                <div className="ims-design-page-content">
                    {design.step === 0 ? <base_1.default /> : ''}
                    {design.step === 1 ? <incs_1.default /> : ''}
                    {design.step === 2 ? <typeorm_1.default /> : ''}
                    {design.step === 3 ? <template_1.default /> : ''}
                    {design.step === 4 ? <finish_1.default /> : ''}
                </div>
            </antd_1.Card>
        </div>;
    }
};
Index = __decorate([
    mobx_react_1.inject('design'),
    mobx_react_1.observer
], Index);
exports.default = Index;
