"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const antd_1 = require("antd");
const ims_adminer_1 = require("ims-adminer");
require("./index.less");
const userMenu = <antd_1.Menu>
    <antd_1.Menu.Item>管理后台</antd_1.Menu.Item>
    <antd_1.Menu.Item>退出登录</antd_1.Menu.Item>
</antd_1.Menu>;
let Index = class Index extends React.Component {
    render() {
        const { homeLayout } = this.props;
        return <antd_1.Layout.Header className="home-header">
            <div className="header-logo">
                <img src={homeLayout.logo} height={45} alt=""/>
            </div>
            <div className="header-left-menu">
                {homeLayout.left.map(it => {
            return <ims_adminer_1.Link to={it.href}>{it.title}</ims_adminer_1.Link>;
        })}
            </div>
            <div className="header-right-menu">
                {this.renderHeaderRightMenu()}
            </div>
        </antd_1.Layout.Header>;
    }
    renderHeaderRightMenu() {
        const { login, homeLayout } = this.props;
        if (login.username) {
            return <div className="username">
                <antd_1.Dropdown trigger={['click']} overlay={userMenu}>
                    <antd_1.Avatar />
                    <span><b>{login.username}</b></span>
                </antd_1.Dropdown>
            </div>;
        }
        else {
            return homeLayout.right.map(it => {
                return <ims_adminer_1.Link key={it.href} to={it.href}>{it.title}</ims_adminer_1.Link>;
            });
        }
    }
};
Index = __decorate([
    mobx_react_1.inject('homeLayout', 'login'),
    mobx_react_1.observer
], Index);
exports.default = Index;
