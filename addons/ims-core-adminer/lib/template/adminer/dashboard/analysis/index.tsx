import React = require('react');
import { Pie } from 'ant-design-pro/lib/Charts';
import { Analysis } from './store'
import { observer, inject } from 'mobx-react'
import { Card, Button } from 'antd'
import Cpu from './cpu'
import Memory from './memory'
import numeral from 'numeral';

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
            <div className="analysis-stats">
                <Cpu />
                <Memory />
            </div>
            <div className="analysis-container">
                <Card title="任务">
                    {this.renderTasks()}
                </Card>
            </div>
        </div>
    }

    renderTasks() {
        const { analysis } = this.props;
        const { tasks } = analysis;
        console.log(tasks)
        if (tasks) {
            return tasks.map(task => {
                const { monit } = task;
                return <Card.Grid style={{ width: `${100 / tasks.length}%` }}>
                    <div style={{ textAlign: 'center' }}>
                        <div>{task.title}</div>
                        <div>内存:{numeral(monit.memory).format('0ib')}</div>
                        <Pie percent={monit.cpu} subTitle="cpu" total={`${monit.cpu}%`} height={140} />
                    </div>
                </Card.Grid>
            })
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