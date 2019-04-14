"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const ims_adminer_1 = require("ims-adminer");
require("./index.less");
const mobx_react_1 = require("mobx-react");
let Index = class Index extends react_1.Component {
    switchEditor() {
        const { type } = this.props;
        if (type === 'markdown') {
            return <ims_adminer_1.Link className="toogle-select" to={'/ims-core-editor/editor/rich'}>
                <antd_1.Icon type="swap"/>
            </ims_adminer_1.Link>;
        }
        else {
            return <ims_adminer_1.Link className="toogle-select" to={'/ims-core-editor/editor/markdown'}>
                <antd_1.Icon type="swap"/>
            </ims_adminer_1.Link>;
        }
    }
    render() {
        const btnProps = {
            onClick: () => this.props.editor.publish(),
            type: "primary"
        };
        return <antd_1.Layout className="ims-core-editor">
            <antd_1.Layout.Header style={{ backgroundColor: '#fff' }} className="header">
                <div className="header-left"></div>
                <antd_1.Input placeholder="请输入标题..."/>
                <div className="header-right">
                    <div className="status-text">
                        文章将会自动保存至
                        <ims_adminer_1.Link to={'/ims-core-editor/drafts'}>草稿</ims_adminer_1.Link>
                    </div>
                    <div className="image-select">
                        <antd_1.Icon type="picture"/>
                    </div>
                    {this.switchEditor()}
                    <antd_1.Dropdown trigger={['click']} overlay={<div className="ims-core-editor-panel">
                        <antd_1.Button {...btnProps}>发布</antd_1.Button>
                    </div>}>
                        <a className="btn-publish" href="javascript:;">
                            发布 <antd_1.Icon type="down"/>
                        </a>
                    </antd_1.Dropdown>
                    <antd_1.Dropdown placement="bottomLeft" trigger={['hover']} overlay={<div>overlay</div>}>
                        <antd_1.Avatar className="user-avatar" shape="circle"/>
                    </antd_1.Dropdown>
                </div>
            </antd_1.Layout.Header>
            <antd_1.Layout.Content className="main">
                {this.props.children}
            </antd_1.Layout.Content>
        </antd_1.Layout>;
    }
};
Index = __decorate([
    mobx_react_1.inject('editor'),
    mobx_react_1.observer
], Index);
exports.default = Index;
