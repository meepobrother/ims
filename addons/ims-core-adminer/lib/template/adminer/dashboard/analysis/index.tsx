import React = require('react');
import { MiniArea } from 'ant-design-pro/lib/Charts';
import { Pie } from 'ant-design-pro/lib/Charts';
import { Analysis } from './store'
import { observer, inject } from 'mobx-react'
import { Card, Button } from 'antd'
import { WaterWave } from 'ant-design-pro/lib/Charts'
import math from 'mathjs';
import Cpu from './cpu'
import Memory from './memory'

import "./index.less";
@inject('analysis', 'role')
@observer
export default class Index extends React.Component<{ analysis?: Analysis, role: any }, any> {
    componentDidMount() {
        this.props.analysis.analysis();
        this.props.analysis.pm2List();
    }
    render() {
        return <div className="ims-page-analysis">
            <div className="analysis-container">
                <Cpu />
                <Memory />
            </div>
            <div className="analysis-container">
                {this.renderDetail()}
                {this.renderCpu()}
                {this.renderTasks()}
            </div>
        </div>
    }

    renderDetail() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            return <Card title="服务器"
                style={{ width: '300px' }}
                className="ims-analysis"
                extra={this.renderExtra()}
            >
                <div>{info.platform}{info.release}:{info.arch}</div>
                <div>
                    {this.toDisplayMem(info.freemem)}/{this.toDisplayMem(info.totalmem)}</div>
                <div>{info.uptime}</div>
            </Card>
        }
    }

    renderTasks() {
        const { analysis } = this.props;
        const { tasks } = analysis;
        if (tasks) {
            return tasks.map(task => {
                const { monit } = task;
                return <Card style={{ width: '300px', marginLeft: '20px' }} title={task.name}>
                    <div style={{ textAlign: 'center' }}>
                        <Pie percent={monit.cpu} subTitle="cpu" total={`${monit.cpu}%`} height={140} />
                    </div>
                </Card>
            })
        }
    }

    renderCpu() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const val = 1 - math.divide(info.freemem, info.totalmem);
            const percent = math.round(math.multiply(val, 100)) as number;
            return <Card title="内存使用"
                style={{ width: '300px', marginLeft: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <WaterWave
                        style={{
                            cursor: 'pointer'
                        }}
                        height={161}
                        title="内存使用"
                        percent={percent}
                    />
                </div>
            </Card>
        }
    }

    renderExtra() {
        const props: any = {
            type: 'ghost'
        };
        const propsRefresh: any = {
            type: 'primary'
        };
        return <div>
            <Button {...propsRefresh}>刷新</Button>
            &nbsp;
            <Button {...props}>重启</Button>
        </div>
    }

    toDisplayMem(v: number) {
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
        return v;
    }
}