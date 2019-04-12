import React, { Component } from 'react'
import { Button, Icon } from 'antd';
import { cx } from './index.scss';
import util from 'ims-util'
import Result from 'ant-design-pro/lib/Result'
export default class Index extends Component<any, any> {
    state = {
        installing: true,
        loading: false
    }
    componentDidMount() {
        console.log('componentDidMount')

        util.ws.on('installSuccess', () => {
            this.setState({
                installing: false
            })
        })
    }
    render() {
        return <div className={cx({ imsFinish: true })}>
            <Result
                title="安装成功"
                type="success"
                description={<div>系统安装成功，选择系统插件!</div>}
                extra={<div className="addon_list">
                    <div className="addon">
                        <Icon className="icon" title="系统核心" type="setting" />
                        <div className="title">系统核心</div>
                    </div>
                    <div className="addon">
                        <Icon className="icon" title="应用商店" type="appstore" />
                        <div className="title">应用商店</div>
                    </div>
                    <div className="addon">
                        <Icon className="icon" title="用户管理" type="user" />
                        <div className="title">用户管理</div>
                    </div>
                    <div className="addon">
                        <Icon className="icon" title="云服务" type="cloud" />
                        <div className="title">云服务</div>
                    </div>
                    <div className="addon">
                        <Icon className="icon" title="联盟链" type="share-alt" />
                        <div className="title">联盟链</div>
                    </div>
                </div>}
                actions={<div>
                    <Button type="primary" loading={this.state.loading} onClick={e => this.install()}>重新启动</Button>
                </div>}>
            </Result>
        </div>
    }

    install() {
        util.http.post('/ims-install/restart')({})
        this.setState({
            loading: true
        })
        setTimeout(() => {
            window.location.href = '/login';
        }, 10000);
    }
}