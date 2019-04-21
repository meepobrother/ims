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
const Ellipsis_1 = __importDefault(require("ant-design-pro/lib/Ellipsis"));
require("./index.less");
const mobx_react_1 = require("mobx-react");
const addBtnProps = {
    type: "dashed",
    className: "add-inc"
};
let Index = class Index extends React.Component {
    render() {
        const { design } = this.props;
        const dataSource = ['', ...design.incs];
        console.log({ design });
        return <div>
            <antd_1.List className="ims-addon-design-incs" grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }} dataSource={dataSource} renderItem={(item) => {
            if (item) {
                return <antd_1.List.Item>
                            <antd_1.Card hoverable actions={[<a>编辑</a>, <a>删除</a>]}>
                                <antd_1.Card.Meta title={item.title} description={<Ellipsis_1.default>{item.description}</Ellipsis_1.default>}></antd_1.Card.Meta>
                            </antd_1.Card>
                        </antd_1.List.Item>;
            }
            else {
                return <antd_1.List.Item>
                            <antd_1.Button {...addBtnProps} onClick={() => { design.openAddInc(); }}>
                                <antd_1.Icon type="plus"/> 新建接口
                        </antd_1.Button>
                        </antd_1.List.Item>;
            }
        }}></antd_1.List>
            <antd_1.Drawer visible={design.showAddInc} onClose={() => design.closeAddInc()} title="添加接口" placement="right" closable={true}></antd_1.Drawer>
        </div>;
    }
};
Index = __decorate([
    mobx_react_1.inject('design'),
    mobx_react_1.observer
], Index);
exports.default = Index;
