import { Button, Icon } from 'antd';
import React = require('react');
import { cx } from './index.scss';
import util from 'ims-util'
import Result from 'ant-design-pro/lib/Result'
export default class Index extends React.Component<any, any> {
    state = {
        installing: true,
        loading: false,
        button: '重新启动',
        total: 0,
        link: ''
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
                actions={this.renderButton()}>
            </Result>
        </div>
    }

    renderButton() {
        if (!!this.state.link && this.state.link.length > 0) {
            const props: any = {
                onClick: () => window.location.href = `${this.state.link}`,
                type: "primary"
            }
            return <Button {...props} >
                {this.state.button}
            </Button >
        } else {
            const props: any = {
                type: "primary",
                loading: this.state.loading,
                onClick: e => this.install()
            }
            return <Button {...props} >
                {this.state.button} {this.state.total > 0 ? `(${this.state.total})` : ''}
            </Button>
        }
    }

    install() {
        util.http.post('/ims-install/restart');
        this.setState({
            loading: true,
            total: 0,
            button: '重新启动中..'
        });
        const pid = setInterval(() => {
            this.setState({
                total: this.state.total + 1
            });
        }, 1000);
        setTimeout(() => request(), 1000)
        const that = this;
        function request() {
            util.http.get('/').then(res => {
                if (res.status === 200) {
                    clearInterval(pid);
                    setTimeout(() => {
                        that.setState({
                            total: 0,
                            button: '进入后台',
                            loading: false,
                            link: '/login'
                        })
                    }, 2000);
                }
            }).catch(e => {
                if (that.state.loading) {
                    setTimeout(() => {
                        request()
                    }, 1000)
                }
            });
        }
    }
}