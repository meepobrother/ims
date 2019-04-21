"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const React = require("react");
const index_scss_1 = require("./index.scss");
const ims_util_1 = __importDefault(require("ims-util"));
const Result_1 = __importDefault(require("ant-design-pro/lib/Result"));
const index_1 = __importDefault(require("../../inc/index"));
class Index extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            installing: true,
            loading: false,
            button: '重新启动',
            total: 0,
            link: ''
        };
    }
    componentDidMount() {
        ims_util_1.default.ws.on('installSuccess', () => {
            this.setState({
                installing: false
            });
        });
    }
    render() {
        return <div className={index_scss_1.cx({ imsFinish: true })}>
            <Result_1.default title="安装成功" type="success" description={<div>系统安装成功，选择系统插件!</div>} extra={<div className="addon_list">
                    <div className="addon">
                        <antd_1.Icon className="icon" title="系统核心" type="setting"/>
                        <div className="title">系统核心</div>
                    </div>
                    <div className="addon">
                        <antd_1.Icon className="icon" title="应用商店" type="appstore"/>
                        <div className="title">应用商店</div>
                    </div>
                    <div className="addon">
                        <antd_1.Icon className="icon" title="用户管理" type="user"/>
                        <div className="title">用户管理</div>
                    </div>
                    <div className="addon">
                        <antd_1.Icon className="icon" title="云服务" type="cloud"/>
                        <div className="title">云服务</div>
                    </div>
                    <div className="addon">
                        <antd_1.Icon className="icon" title="联盟链" type="share-alt"/>
                        <div className="title">联盟链</div>
                    </div>
                </div>} actions={this.renderButton()}>
            </Result_1.default>
        </div>;
    }
    renderButton() {
        if (!!this.state.link && this.state.link.length > 0) {
            const props = {
                onClick: () => window.location.href = `${this.state.link}`,
                type: "primary"
            };
            return <antd_1.Button {...props}>
                {this.state.button}
            </antd_1.Button>;
        }
        else {
            const props = {
                type: "primary",
                loading: this.state.loading,
                onClick: e => this.install()
            };
            return <antd_1.Button {...props}>
                {this.state.button} {this.state.total > 0 ? `(${this.state.total})` : ''}
            </antd_1.Button>;
        }
    }
    install() {
        index_1.default.restart();
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
        setTimeout(() => request(), 1000);
        const that = this;
        function request() {
            index_1.default.successRestart('1').then(res => {
                if (res.code === 0) {
                    clearInterval(pid);
                    setTimeout(() => {
                        that.setState({
                            total: 0,
                            button: '进入后台',
                            loading: false,
                            link: '/login'
                        });
                    }, 2000);
                }
            }).catch(e => {
                if (that.state.loading) {
                    setTimeout(() => {
                        request();
                    }, 1000);
                }
            });
        }
    }
}
exports.default = Index;
