import React = require('react');
import {
    Form, Input
} from 'antd';
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
import { inject, observer } from 'mobx-react'
import { AddonDesign } from '../store'
@inject('design')
@observer
export default class Index extends React.Component<{ design?: AddonDesign }, any> {
    render() {
        const { design } = this.props;
        return <Form {...formItemLayout}>
            {Object.keys(design.baseForm).map(key => {
                const item = design.baseForm[key];
                return <Form.Item key={key} {...item.item}>
                    <Input {...item.input} />
                </Form.Item>
            })}
        </Form>
    }
}
