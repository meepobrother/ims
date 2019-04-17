"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
require("./index.less");
const Charts_1 = require("ant-design-pro/lib/Charts");
const Charts_2 = require("ant-design-pro/lib/Charts");
const antd_1 = require("antd");
let Index = class Index extends React.Component {
    render() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            return <div className="cpu">
                {this.renderCpu()}
            </div>;
        }
        return <div></div>;
    }
    renderCpu() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const percent = this.getTotalV();
            return <Charts_2.ChartCard title={`CPU已使用`} action={<antd_1.Tooltip title="指标说明">
                        <antd_1.Icon type="info-circle-o"/>
                    </antd_1.Tooltip>} total={() => {
                return <div style={{ display: 'flex' }}>
                        {parseInt(`${percent / 10}`)}% &nbsp;
                        <Charts_1.WaterWave height={38} title="" percent={percent / 10}/>
                    </div>;
            }} footer={<Charts_2.Field label="总共" value={`${info.processes.length}个进程`}/>} contentHeight={46}></Charts_2.ChartCard>;
        }
    }
    getTotalV() {
        const { analysis } = this.props;
        const { info } = analysis;
        let total = 0;
        if (info) {
            const { processes } = info;
            processes.map(task => {
                total += task.cpu;
            });
        }
        return total;
    }
};
Index = __decorate([
    mobx_react_1.inject('analysis'),
    mobx_react_1.observer
], Index);
exports.default = Index;
