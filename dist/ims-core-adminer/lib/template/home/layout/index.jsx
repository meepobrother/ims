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
const mobx_react_1 = require("mobx-react");
const React = require("react");
const antd_1 = require("antd");
const header_1 = __importDefault(require("./header"));
const footer_1 = __importDefault(require("./footer"));
const ims_adminer_1 = require("ims-adminer");
require("./index.less");
let Index = class Index extends React.Component {
    componentDidMount() { }
    render() {
        return <antd_1.Layout className="ims-home-layout">
            <header_1.default />
            <antd_1.Layout.Content className="layout-content">
                <ims_adminer_1.ImsRoutes route={this.props.route}/>
                <footer_1.default />
            </antd_1.Layout.Content>
        </antd_1.Layout>;
    }
};
Index = __decorate([
    mobx_react_1.observer
], Index);
exports.default = Index;
