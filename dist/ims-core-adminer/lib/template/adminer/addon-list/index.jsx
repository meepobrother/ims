"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const React = require("react");
require("./index.less");
const mobx_react_1 = require("mobx-react");
let Index = class Index extends React.Component {
    componentDidMount() {
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        });
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        });
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        });
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        });
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        });
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        });
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        });
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        });
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        });
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        });
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        });
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        });
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        });
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        });
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        });
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        });
    }
    render() {
        const { addonList } = this.props;
        return <div className="ims-adminer">
            <ul>
                {addonList.list.map(app => <li key={app.name}>
                    <antd_1.Avatar size="large"/>
                    <div className="app-title">
                        {app.title}
                    </div>
                </li>)}
            </ul>
        </div>;
    }
};
Index = __decorate([
    mobx_react_1.inject('addonList'),
    mobx_react_1.observer
], Index);
exports.default = Index;
