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
const Charts_1 = require("ant-design-pro/lib/Charts");
const mobx_react_1 = require("mobx-react");
const antd_1 = require("antd");
const cpu_1 = __importDefault(require("./cpu"));
const memory_1 = __importDefault(require("./memory"));
const numeral_1 = __importDefault(require("numeral"));
require("./index.less");
let Index = class Index extends React.Component {
    componentDidMount() {
        this.props.analysis.analysis();
    }
    render() {
        return <div className="ims-page-analysis">
            <antd_1.Card title="服务器" extra={this.renderExtra()}>
                {this.renderDetail()}
            </antd_1.Card>
            <antd_1.Card style={{ marginTop: '10px' }}>
                {this.renderTasks()}
            </antd_1.Card>
            <div className="analysis-stats">
                <cpu_1.default />
                <memory_1.default />
            </div>
            <div className="analysis-tasks">
                {this.renderTask()}
            </div>
        </div>;
    }
    renderDetail() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            return <div className="ims-detail">
                <div className="system-info">
                    <div className="ims-detail-item">主机名：
                        <span>{info.hostname}</span>
                    </div>
                    <div className="ims-detail-item">平台：<span>{info.platform}</span></div>
                    <div className="ims-detail-item">版本号：<span>{info.release}</span></div>
                    <div className="ims-detail-item">CPU构架：<span>{info.arch}</span></div>
                    <div className="ims-detail-item">运行时间：<span>{numeral_1.default(info.uptime).format('00:00:00')}</span></div>
                </div>
                <div className="node-info">
                    <div className="ims-detail-item">node版本: <span>{info.node.versions.node}</span></div>
                    <div className="ims-detail-item">node路径: <span>{info.node.path}</span></div>
                    <div className="ims-detail-item">根目录: <span>{info.node.cwd}</span></div>
                    <div className="ims-detail-item">V8版本: <span>{info.node.versions.v8}</span></div>
                    <div className="ims-detail-item">zlib版本: <span>{info.node.versions.zlib}</span></div>
                    <div className="ims-detail-item">openssl版本: <span>{info.node.versions.openssl}</span></div>
                </div>
            </div>;
        }
    }
    renderTasks() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info && info.pm2) {
            const tasks = info.pm2;
            return tasks.map(task => {
                const { monit } = task;
                return <antd_1.Card.Grid style={{ width: `${100 / tasks.length}%` }}>
                    <div style={{ textAlign: 'center' }}>
                        <div>{task.title}</div>
                        <div>内存:{numeral_1.default(monit.memory).format('0b')}</div>
                        <Charts_1.Pie percent={monit.cpu} subTitle="cpu" total={`${monit.cpu}%`} height={140}/>
                    </div>
                </antd_1.Card.Grid>;
            });
        }
    }
    renderExtra() {
        const propsRefresh = {
            type: 'primary',
            loading: !!this.props.analysis.loading,
            onClick: () => {
                this.props.analysis.analysis();
            }
        };
        return <div>
            <antd_1.Button {...propsRefresh}>刷新</antd_1.Button>
        </div>;
    }
    renderTask() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const columns = [{
                    title: 'Pid',
                    key: 'pid',
                    dataIndex: 'pid'
                }, {
                    title: 'Name',
                    key: 'name',
                    dataIndex: 'name'
                }, {
                    title: 'Cpu(%)',
                    key: 'cpu',
                    dataIndex: 'cpu',
                    render: (item) => {
                        return numeral_1.default(item).format('0.0');
                    },
                    sorter: (a, b) => {
                        return a.cpu - b.cpu;
                    },
                    sortDirections: ['descend', 'ascend'],
                }, {
                    title: '内存(%)',
                    key: 'mem',
                    dataIndex: 'mem',
                    render: (item) => {
                        return numeral_1.default(item.usage).format('0.00');
                    },
                    sorter: (a, b) => {
                        return a.mem.usage - b.mem.usage;
                    },
                    sortDirections: ['descend', 'ascend'],
                }];
            return <antd_1.Table pagination={{
                pageSize: 20
            }} dataSource={info.processes} columns={columns}></antd_1.Table>;
        }
    }
};
Index = __decorate([
    mobx_react_1.inject('analysis', 'role'),
    mobx_react_1.observer
], Index);
exports.default = Index;
