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
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
const mobx_react_1 = require("mobx-react");
let Index = class Index extends React.Component {
    render() {
        const { design } = this.props;
        return <antd_1.Form {...formItemLayout}>
            {Object.keys(design.baseForm).map(key => {
            const item = design.baseForm[key];
            return <antd_1.Form.Item key={key} {...item.item}>
                    <antd_1.Input {...item.input}/>
                </antd_1.Form.Item>;
        })}
        </antd_1.Form>;
    }
};
Index = __decorate([
    mobx_react_1.inject('design'),
    mobx_react_1.observer
], Index);
exports.default = Index;
