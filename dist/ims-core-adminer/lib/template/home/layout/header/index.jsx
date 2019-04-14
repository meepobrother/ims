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
let Index = class Index extends React.Component {
    render() {
        const { homeLayout } = this.props;
        return <antd_1.Layout.Header className="home-header">
            <div className="header-logo">
                <img src={homeLayout.logo} height={45} alt=""/>
            </div>
            <antd_1.Menu className="header-left-menu" mode="horizontal" style={{ height: '64px', lineHeight: '64px' }} theme="dark">
                {homeLayout.left.map(it => {
            return <antd_1.Menu.Item key={it.href}>
                        <ims_adminer_1.Link to={it.href}>{it.title}</ims_adminer_1.Link>
                    </antd_1.Menu.Item>;
        })}
            </antd_1.Menu>
            <div className="header-right-menu">
                {homeLayout.right.map(it => {
            return <ims_adminer_1.Link key={it.href} to={it.href}>{it.title}</ims_adminer_1.Link>;
        })}
            </div>
        </antd_1.Layout.Header>;
    }
};
Index = __decorate([
    mobx_react_1.inject('homeLayout'),
    mobx_react_1.observer
], Index);
exports.default = Index;
