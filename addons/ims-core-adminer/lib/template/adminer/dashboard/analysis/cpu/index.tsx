import React = require('react')
import { inject, observer } from 'mobx-react'
import { Analysis } from '../store'
import { Table } from 'antd';
import "./index.less"
import math from 'mathjs';
import { WaterWave } from 'ant-design-pro/lib/Charts'
import { ChartCard, Field } from 'ant-design-pro/lib/Charts';
import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';

@inject('analysis')
@observer
export default class Index extends React.Component<{
    analysis?: Analysis
}, any> {
    render() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const { cpus } = info;
            const columns = [{
                title: '型号',
                dataIndex: 'model',
                key: 'model',
                width: '400px'
            }, {
                title: '频率',
                dataIndex: 'speed',
                key: 'speed',
                width: '80px'
            }, {
                title: `使用率`,
                dataIndex: 'times',
                key: 'times',
                render: (text: {
                    user: number;
                    nice: number;
                    sys: number;
                    idle: number;
                    irq: number
                }, record: any, index: number) => {
                    return <div key={index}>
                        {math.round(math.divide(text.idle, text.idle + text.user + text.nice + text.sys + text.irq) * 100)}%
                    </div>
                }
            }];
            return <div className="cpu">
                {this.renderCpu()}
                {/* <Table dataSource={cpus} columns={columns} /> */}
            </div>
        }
        return <div></div>
    }

    renderCpu() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const total = this.getTotalV();
            const percent = numeral(total.idle).divide(total.total).multiply(1000).value()
            return <ChartCard
                title={`CPU已使用`}
                action={
                    <Tooltip title="指标说明">
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total={() => {
                    return <div style={{ display: 'flex' }}>
                        {parseInt(`${percent / 10}`)}% &nbsp;
                        <WaterWave
                            height={38}
                            title=""
                            percent={percent / 10}
                        />
                    </div>
                }}
                footer={<Field label="总计" value={numeral(total.total).format('0,0') + 'Hz'} />}
                contentHeight={46}
            ></ChartCard>
        }
    }

    getTotalV(): { idle: number, total: number } {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const { cpus } = info;
            let idle = 0;
            let total = 0;
            cpus.map(cpu => {
                Object.keys(cpu.times).map(key => total += cpu.times[key]);
                idle += cpu.times.idle;
            });
            return {
                idle,
                total
            }
        }
        return {
            idle: 0,
            total: 0
        }
    }
}
