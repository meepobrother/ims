"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./index.less");
const mobx_react_1 = require("mobx-react");
const ims_adminer_1 = require("ims-adminer");
let Index = class Index extends React.Component {
    componentDidMount() {
    }
    render() {
        return <div className="ims-adminer-manager-home-page">
            <ims_adminer_1.Link to="/adminer/member/list">会员管理</ims_adminer_1.Link>
            <ims_adminer_1.Link to="/adminer/fans/list">粉丝管理</ims_adminer_1.Link>
            <ims_adminer_1.Link to="/adminer/message/list">留言管理</ims_adminer_1.Link>
        </div>;
    }
};
Index = __decorate([
    mobx_react_1.observer
], Index);
exports.default = Index;
