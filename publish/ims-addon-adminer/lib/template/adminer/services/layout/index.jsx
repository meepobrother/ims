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
const PageHeader_1 = __importDefault(require("ant-design-pro/lib/PageHeader"));
const header = {};
require("./index.less");
const mobx_react_1 = require("mobx-react");
const index_1 = __importDefault(require("../list/index"));
const add_1 = __importDefault(require("../add/add"));
let Index = class Index extends React.Component {
    componentDidMount() {
        this.props.home.getList();
    }
    render() {
        const { home } = this.props;
        return <div className="ims-adminer-manager-home-page">
            <PageHeader_1.default {...header} title="服务管理" wide={true} content={<div>
                        <p>
                            服务可以将多台服务器联合，已达到实际业务中的并发需求!
                        </p>
                    </div>} tabList={[{ key: 'list', tab: '服务列表' }, { key: 'add', tab: '添加服务' }]} onTabChange={key => home.setActiveTab(key)} tabActiveKey={home.activeTab}>
            </PageHeader_1.default>
            <div className="main">
                {home.activeTab === 'list' ? <index_1.default /> : ''}
                {home.activeTab === 'add' ? <add_1.default /> : ''}
            </div>
        </div>;
    }
};
Index = __decorate([
    mobx_react_1.inject('home'),
    mobx_react_1.observer
], Index);
exports.default = Index;
