"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ims_adminer_1 = require("ims-adminer");
const header_1 = __importDefault(require("../home/layout/header"));
const footer_1 = __importDefault(require("../home/layout/footer"));
const antd_1 = require("antd");
require("./index.less");
class Index extends React.Component {
    render() {
        return <antd_1.Layout className="ims-home-layout">
            <header_1.default />
            <antd_1.Layout.Content className="layout-content">
                <ims_adminer_1.ImsRoutes route={this.props.route}/>
                <footer_1.default />
            </antd_1.Layout.Content>
        </antd_1.Layout>;
    }
}
exports.default = Index;
