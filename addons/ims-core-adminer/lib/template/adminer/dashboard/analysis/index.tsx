import React = require('react');
import { Pie } from 'ant-design-pro/lib/Charts';
import { Analysis } from './store'
import { observer, inject } from 'mobx-react'
import { Card, Button, Table } from 'antd'
import Cpu from './cpu'
import Memory from './memory'
import numeral from 'numeral';

import "./index.less";
@inject('analysis', 'role')
@observer
export default class Index extends React.Component<{ analysis?: Analysis, role: any }, any> {
    componentDidMount() {
        this.props.analysis.analysis();
    }
    render() {
        return <div className="ims-page-analysis">
            <Card title="服务器" extra={this.renderExtra()}>
                {this.renderDetail()}
            </Card>
            <div className="analysis-stats">
                <Cpu />
                <Memory />
            </div>
            <div className="analysis-container">
                <Card>
                    {this.renderTasks()}
                </Card>
            </div>
            <div className="analysis-tasks">
                {this.renderTask()}
            </div>
        </div>
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
                    <div className="ims-detail-item">运行时间：<span>{numeral(info.uptime).format('00:00:00')}</span></div>
                </div>
                <div className="node-info">
                    <div className="ims-detail-item">node版本: <span>{info.node.versions.node}</span></div>
                    <div className="ims-detail-item">node路径: <span>{info.node.path}</span></div>
                    <div className="ims-detail-item">根目录: <span>{info.node.cwd}</span></div>
                    <div className="ims-detail-item">V8版本: <span>{info.node.versions.v8}</span></div>
                    <div className="ims-detail-item">zlib版本: <span>{info.node.versions.zlib}</span></div>
                    <div className="ims-detail-item">openssl版本: <span>{info.node.versions.openssl}</span></div>
                </div>
            </div>
        }
    }

    renderTasks() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info && info.pm2) {
            const tasks = info.pm2;
            return tasks.map(task => {
                const { monit } = task;
                return <Card.Grid style={{ width: `${100 / tasks.length}%` }}>
                    <div style={{ textAlign: 'center' }}>
                        <div>{task.title}</div>
                        <div>内存:{numeral(monit.memory).format('0b')}</div>
                        <Pie percent={monit.cpu} subTitle="cpu" total={`${monit.cpu}%`} height={140} />
                    </div>
                </Card.Grid>
            })
        }
    }

    renderExtra() {
        const propsRefresh: any = {
            type: 'primary',
            loading: !!this.props.analysis.loading,
            onClick: () => {
                this.props.analysis.analysis();
            }
        };
        return <div>
            <Button {...propsRefresh}>刷新</Button>
        </div>
    }

    renderTask() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const columns: any = [{
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
                    return numeral(item).format('0.0')
                },
                sorter: (a, b) => {
                    return a.cpu - b.cpu
                },
                sortDirections: ['descend', 'ascend'],
            }, {
                title: '内存(%)',
                key: 'mem',
                dataIndex: 'mem',
                render: (item) => {
                    return numeral(item.usage).format('0.00')
                },
                sorter: (a, b) => {
                    return a.mem.usage - b.mem.usage;
                },
                sortDirections: ['descend', 'ascend'],
            }];
            return <Table pagination={{
                pageSize: 20
            }} dataSource={info.processes} columns={columns}></Table>
        }
    }
}
