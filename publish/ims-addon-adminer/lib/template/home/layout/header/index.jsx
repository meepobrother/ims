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
        const { homeLayout } = this.props;
        if (ims_adminer_1.role.username) {
            const userMenu = <antd_1.Menu>
                {homeLayout.userMenus.map(menu => {
                return <antd_1.Menu.Item onClick={menu.onClick}>
                        {menu.title}
                    </antd_1.Menu.Item>;
            })}
            </antd_1.Menu>;
            return <antd_1.Dropdown trigger={['hover']} overlay={userMenu}>
                <div className="username">
                    <antd_1.Avatar src={ims_adminer_1.role.avatar}/>
                    <span>{ims_adminer_1.role.username}</span>
                </div>
            </antd_1.Dropdown>;
        }
        else {
            return homeLayout.right.map(it => {
                return <ims_adminer_1.Link key={it.href} to={it.href}>{it.title}</ims_adminer_1.Link>;
            });
        }
    }
};
Index = __decorate([
    mobx_react_1.inject('homeLayout', 'role'),
    mobx_react_1.observer
], Index);
exports.default = Index;
