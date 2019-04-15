import React = require('react');
import {
    Form, Input, Steps, Button, Card, DatePicker, TimePicker, Select, Cascader, InputNumber,
} from 'antd';
const { Option } = Select;
import Base from './base'
import "./index.less";
export default class Index extends React.Component<any, any> {
    render() {
        const btn: any = {};
        return <div className="ims-design-page">
            <Card title="设计模块" actions={[<Button {...btn}>上一步</Button>, <Button {...btn} type="primary">下一步</Button>]}>
                <Steps current={0}>
                    <Steps.Step title="基础信息" />
                    <Steps.Step title="接口信息" />
                    <Steps.Step title="数据信息" />
                    <Steps.Step title="模板信息" />
                </Steps>
                <div className="ims-design-page-content">
                    <Base />
                </div>
            </Card>
        </div>
    }
}