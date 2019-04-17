import React = require('react');
import Result from 'ant-design-pro/lib/Result';
const btn: any = {};
import { Button } from 'antd';
import { inject, observer } from 'mobx-react'
import { AddonDesign } from '../store'
@inject('design')
@observer
export default class Index extends React.Component<{ design?: AddonDesign }, any> {
    render() {
        const { design } = this.props;
        return <Result type="success" actions={
            <Button {...btn} type="primary" onClick={() => design.finish()}>确认提交</Button>
        } extra={<div>
            <div>模块代号：{design.name}</div>
            <div>模块名称：{design.title}</div>
            <div>版本号：{design.version}</div>
        </div>} title="模块设计完成"></Result>
    }
}
