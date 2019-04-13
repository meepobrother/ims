import React, { Component } from 'react';
import { cx } from "./install.scss";
import util from 'ims-util';
import { Steps, Icon } from 'antd';

import Bind from './bind';
import Finish from './finish';
import Setting from './setting';
import Info from './info';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

import logo6 from './logo6.png';
interface IndexState {
    step: number;
    db: {
        host: string;
        port: string;
        username: string;
        password: string;
    },
    user: {
        username: string;
        password: string;
    }
}

export default class Index extends Component<any, IndexState> {
    state: IndexState = {
        step: 0,
        db: {
            host: 'localhost',
            port: '3306',
            username: 'root',
            password: '123456',
        },
        user: {
            username: 'admin',
            password: '123456'
        }
    }
    componentDidMount() { }
    install() {
        util.http.post('/ims-install/install', this.state).then(res => {
            console.log(res)
        });
    }
    changeDb(key: string, value: string) {
        const { db } = this.state;
        db[key] = value;
        this.setState({
            db
        });
    }
    nextStep() {
        this.setState({
            step: this.state.step + 1
        })
    }
    prevStep() {
        this.setState({
            step: this.state.step - 1
        })
    }
    render() {
        return <div className={cx({
            imsInstall: true
        })}>
            <div className={cx({ content: true })}>
                <div className={cx({
                    container: true
                })}>
                    <div className={cx({
                        login: true
                    })}>
                        <div className={cx({
                            loginHeader: true
                        })}>
                            <img style={{
                                height: '50px'
                            }} className="logo" src={logo6} alt="ims" />
                        </div>
                        <Steps style={{ minWidth: '650px' }} current={this.state.step}>
                            <Steps.Step title="协议" icon={<Icon type="property-safety" />}></Steps.Step>
                            <Steps.Step title="配置" icon={<Icon type="setting" />} />
                            <Steps.Step title="账户" icon={<Icon type="user" />} />
                            <Steps.Step title="完成" icon={<Icon type="smile-o" />} />
                        </Steps>
                        <div className={cx({ mainForm: true })}>
                            {this.state.step === 0 ? <Info next={() => this.nextStep()} /> : null}
                            {this.state.step === 1 ? <Setting prev={() => this.prevStep()} next={() => this.nextStep()} /> : null}
                            {this.state.step === 2 ? <Bind prev={() => this.prevStep()} next={() => this.nextStep()} /> : null}
                            {this.state.step === 3 ? <Finish prev={() => this.prevStep()} /> : null}
                        </div>
                    </div>
                </div>
                <GlobalFooter copyright={<div>
                    <p>Copyright © 2019 杭州米波网络科技有限公司</p>
                    <p>网站备案/许可证号：豫ICP备14020079号-3</p>
                </div>} />
            </div>
        </div>
    }
}
