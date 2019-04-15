import React = require('react')
import { inject, observer } from 'mobx-react'
import { Analysis } from '../store'
import "./index.less"
import { WaterWave } from 'ant-design-pro/lib/Charts'
import { ChartCard, Field } from 'ant-design-pro/lib/Charts';
import { Icon, Tooltip } from 'antd';

@inject('analysis')
@observer
export default class Index extends React.Component<{
    analysis?: Analysis
}, any> {
    render() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            return <div className="cpu">
                {this.renderCpu()}
            </div>
        }
        return <div></div>
    }

    renderCpu() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const percent = this.getTotalV();
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
                footer={<Field label="总共" value={`${info.processes.length}个进程`} />}
                contentHeight={46}
            ></ChartCard>
        }
    }

    getTotalV(): number {
        const { analysis } = this.props;
        const { info } = analysis;
        let total = 0;
        if (info) {
            const { processes } = info;
            processes.map(task => {
                total += task.cpu
            });
        }
        return total
    }
}
