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
const tableProps = {};
const mobx_react_1 = require("mobx-react");
const btnProps = {};
let Index = class Index extends React.Component {
    componentDidMount() {
        this.props.mine.getMineAddons();
    }
    render() {
        const { mine } = this.props;
        const columns = [...mine.columns, {
                title: '操作',
                render: (item) => {
                    console.log(item);
                    return <div>
                    <antd_1.Button {...btnProps} type="default" shape="circle" icon="desktop"></antd_1.Button>
                    &nbsp;
                    <antd_1.Button {...btnProps} type="default" shape="circle" icon="edit"></antd_1.Button>
                    &nbsp;
                    <antd_1.Button {...btnProps} type="primary" icon="cloud"></antd_1.Button>
                </div>;
                }
            }];
        return <antd_1.Table {...tableProps} dataSource={mine.list} columns={columns}></antd_1.Table>;
    }
};
Index = __decorate([
    mobx_react_1.inject('mine'),
    mobx_react_1.observer
], Index);
exports.default = Index;
