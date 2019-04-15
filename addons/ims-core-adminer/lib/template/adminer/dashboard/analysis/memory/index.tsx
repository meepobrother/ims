import React = require('react')
import "./index.less"
import math from 'mathjs';
import { inject, observer } from 'mobx-react'
import { Analysis } from '../store'
import { ChartCard, Field } from 'ant-design-pro/lib/Charts';
import { Icon, Tooltip } from 'antd';

@inject('analysis')
@observer
export default class Index extends React.Component<{ analysis?: Analysis }, any> {
    render() {
        return <div className="memory">
            {this.renderMemory()}
        </div>
    }

    renderMemory() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            return <ChartCard
                title="剩余内存"
                action={
                    <Tooltip title="指标说明">
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total={this.toDisplayMem(info.freemem)}
                footer={<Field label="总计" value={this.toDisplayMem(info.totalmem)} />}
                contentHeight={46}
            ></ChartCard>
        }
    }
    getV() {
        const { analysis } = this.props;
        const { info } = analysis;
        if (info) {
            const val = 1 - math.divide(info.freemem, info.totalmem);
            return math.round(math.multiply(val, 100)) as number;
        }
        return 0;
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
        return `${v}`;
    }
}
