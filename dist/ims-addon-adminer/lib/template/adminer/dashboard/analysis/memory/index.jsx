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
require("./index.less");
const mathjs_1 = __importDefault(require("mathjs"));
const mobx_react_1 = require("mobx-react");
const Charts_1 = require("ant-design-pro/lib/Charts");
const antd_1 = require("antd");
let Index = class Index extends React.Component {
    render() {
        return <div className="memory">
            {this.renderMemory()}
        </div>;
    }
    renderMemory() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            return <Charts_1.ChartCard title="剩余内存" action={<antd_1.Tooltip title="指标说明">
                        <antd_1.Icon type="info-circle-o"/>
                    </antd_1.Tooltip>} total={this.toDisplayMem(info.freemem)} footer={<Charts_1.Field label="总计" value={this.toDisplayMem(info.totalmem)}/>} contentHeight={46}></Charts_1.ChartCard>;
        }
    }
    getV() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const val = 1 - mathjs_1.default.divide(info.freemem, info.totalmem);
            return mathjs_1.default.round(mathjs_1.default.multiply(val, 100));
        }
        return 0;
    }
    toDisplayMem(v) {
        if (v >= (1024 * 1024 * 1024)) {
            v /= (1024 * 1024 * 1024);
            return v.toFixed(2) + "GB";
        }
        if (v >= (1024 * 1024)) {
            v /= (1024 * 1024);
            return v.toFixed(2) + "MB";
        }
        if (v >= (1024)) {
            v /= (1024);
            return v.toFixed(2) + "KB";
        }
        return `${v}`;
    }
};
Index = __decorate([
    mobx_react_1.inject('analysis'),
    mobx_react_1.observer
], Index);
exports.default = Index;
