import React = require('react');
import {
    Form, Input, Steps, Button, DatePicker, TimePicker, Select, Cascader, InputNumber,
} from 'antd';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
export default class Index extends React.Component<any, any> {
    render() {
        return <Form {...formItemLayout}>
            <Form.Item label="模块代号">
                <Input placeholder="模块代号" />
            </Form.Item>
            <Form.Item label="模块名称">
                <Input placeholder="模块名称" />
            </Form.Item>
            <Form.Item label="模块简介">
                <Input placeholder="模块简介" />
            </Form.Item>
            <Form.Item label="icon">
                <Input placeholder="icon" />
            </Form.Item>
            <Form.Item label="logo">
                <Input placeholder="logo" />
            </Form.Item>
            <Form.Item label="版本号">
                <Input placeholder="version" />
            </Form.Item>
            <Form.Item label="详情">
                <Input placeholder="Detail" />
            </Form.Item>
            <Form.Item label="轮播">
                <Input placeholder="thumb" />
            </Form.Item>
        </Form>
    }
}
