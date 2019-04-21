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
const ims_adminer_1 = require("ims-adminer");
require("./index.less");
const header_1 = __importDefault(require("./header"));
const mobx_react_1 = require("mobx-react");
const GlobalFooter_1 = __importDefault(require("ant-design-pro/lib/GlobalFooter"));
let Index = class Index extends React.Component {
    render() {
        const { adminerLayout } = this.props;
        return <antd_1.Layout className="ims-adminer-layout">
            <antd_1.Layout.Sider collapsed={adminerLayout.collapsed} className="layout-sider">
                <div className="ucenter"></div>
                <antd_1.Menu theme="dark">
                    <antd_1.Menu.Item>首页</antd_1.Menu.Item>
                </antd_1.Menu>
            </antd_1.Layout.Sider>
            <antd_1.Layout.Content className="layout-content">
                <antd_1.Layout>
                    <antd_1.Layout.Header className="layout-header">
                        <header_1.default />
                    </antd_1.Layout.Header>
                    <antd_1.Layout.Content className="main">
                        <ims_adminer_1.ImsRoutes route={this.props.route}/>
                        <GlobalFooter_1.default copyright={adminerLayout.copyright}/>
                    </antd_1.Layout.Content>
                </antd_1.Layout>
            </antd_1.Layout.Content>
        </antd_1.Layout>;
    }
};
Index = __decorate([
    mobx_react_1.inject('adminerLayout'),
    mobx_react_1.observer
], Index);
exports.default = Index;
