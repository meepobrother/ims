import React = require('react');
import { Steps, Button, Card } from 'antd';
import "./index.less";
import { observer, inject } from 'mobx-react'
import { AddonDesign } from './store'
import Base from './base'
import Incs from './incs'
import Typeorm from './typeorm'
import Template from './template'

@inject('design')
@observer
export default class Index extends React.Component<{ design: AddonDesign }, any> {
    render() {
        const { design } = this.props;
        return <div className="ims-design-page">
            <Card title="设计模块" actions={[<Button {...design.prevBtn.props}>{design.prevBtn.title}</Button>, <Button {...design.nextBtn.props} type="primary">{design.nextBtn.title}</Button>]}>
                <Steps current={design.step}>
                    <Steps.Step title="基础信息" />
                    <Steps.Step title="接口信息" />
                    <Steps.Step title="数据信息" />
                    <Steps.Step title="模板信息" />
                </Steps>
                <div className="ims-design-page-content">
                    {design.step === 0 ? <Base /> : ''}
                    {design.step === 1 ? <Incs /> : ''}
                    {design.step === 2 ? <Typeorm /> : ''}
                    {design.step === 3 ? <Template /> : ''}
                </div>
            </Card>
        </div>
    }
}