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
require("./index.less");
const mobx_react_1 = require("mobx-react");
let Index = class Index extends React.Component {
    render() {
        const { adminerLayout, role } = this.props;
        const overlay = <antd_1.Menu>
            {adminerLayout.menus.map(menu => {
            return <antd_1.Menu.Item onClick={(param) => menu.onClick(param)}>{menu.title}</antd_1.Menu.Item>;
        })}
        </antd_1.Menu>;
        return <div className="ims-global-header">
            <span className="global-header-index-trigger" onClick={() => adminerLayout.setCollapsed()}>
                <antd_1.Icon type={adminerLayout.collapsedIcon}/>
            </span>
            <div className="global-header-index-left">
                {adminerLayout.lefts.map(left => {
            return <div className="global-header-index-left-item" onClick={(param) => left.onClick(param)}>{left.title}</div>;
        })}
            </div>
            <div className="global-header-index-right">
                <antd_1.Dropdown className="username" trigger={['hover']} overlay={overlay}>
                    <div className="username-wrapper">
                        <antd_1.Avatar className="avatar" src={role.avatar}/>
                        <span>{role.username}</span>
                    </div>
                </antd_1.Dropdown>
            </div>
        </div>;
    }
};
Index = __decorate([
    mobx_react_1.inject('adminerLayout', 'role'),
    mobx_react_1.observer
], Index);
exports.default = Index;
