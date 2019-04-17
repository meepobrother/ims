"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const index_scss_1 = require("./index.scss");
const ims_util_1 = __importDefault(require("ims-util"));
const React = require("react");
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host: {
                hasFeedback: true,
                required: true,
                validateStatus: '',
                label: '数据库地址',
                value: 'localhost',
                placeholder: '数据库地址'
            },
            port: {
                hasFeedback: true,
                required: true,
                validateStatus: '',
                label: '端口号',
                placeholder: '请输入端口号',
                value: '3306'
            },
            username: {
                hasFeedback: true,
                required: true,
                validateStatus: '',
                label: '用户名',
                placeholder: '请输入用户名',
                value: 'root'
            },
            password: {
                hasFeedback: true,
                required: true,
                validateStatus: '',
                label: '密码',
                placeholder: '请输入密码',
                value: ''
            },
        };
    }
    render() {
        const nextBtnProps = {
            type: "primary",
            onClick: () => this.next()
        };
        const prevBtnProps = {
            onClick: () => this.props.prev()
        };
        const { username, host, port, password } = this.state;
        return <antd_1.Form className={index_scss_1.cx({ imsSetting: true })} labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            <antd_1.Form.Item {...host}>
                <antd_1.Input value={host.value} onChange={e => this.setHost(e.target.value)} placeholder={host.placeholder}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item {...port}>
                <antd_1.Input value={port.value} onChange={e => this.setPort(e.target.value)} placeholder={port.placeholder}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item {...username}>
                <antd_1.Input value={username.value} onChange={e => this.setUsername(e.target.value)} placeholder={username.placeholder}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item {...password}>
                <antd_1.Input type="password" value={password.value} onChange={e => this.setPassword(e.target.value)} placeholder={password.placeholder}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                <div className={index_scss_1.cx({ footerBar: true })}>
                    <antd_1.Button {...prevBtnProps}>上一步</antd_1.Button>
                    <antd_1.Button {...nextBtnProps}>下一步</antd_1.Button>
                </div>
            </antd_1.Form.Item>
        </antd_1.Form>;
    }
    setUsername(val) {
        this.setState({
            username: {
                ...this.state.username,
                value: val,
                validateStatus: 'success'
            }
        });
    }
    setPassword(val) {
        this.setState({
            password: {
                ...this.state.password,
                value: val,
                validateStatus: 'success'
            }
        });
    }
    setHost(val) {
        this.setState({
            host: {
                ...this.state.host,
                value: val,
                validateStatus: 'success'
            }
        });
    }
    setPort(val) {
        this.setState({
            port: {
                ...this.state.port,
                value: val,
                validateStatus: 'success'
            }
        });
    }
    next() {
        if (this.state.host.value.length <= 0) {
            return this.setState({
                host: {
                    ...this.state.host,
                    validateStatus: 'error'
                }
            });
        }
        if (this.state.password.value.length <= 0) {
            return this.setState({
                password: {
                    ...this.state.password,
                    validateStatus: 'error'
                }
            });
        }
        if (this.state.username.value.length <= 0) {
            return this.setState({
                username: {
                    ...this.state.username,
                    validateStatus: 'error'
                }
            });
        }
        if (this.state.port.value.length <= 0) {
            return this.setState({
                port: {
                    ...this.state.port,
                    validateStatus: 'error'
                }
            });
        }
        // 配置并连接数据库
        ims_util_1.default.http.post('ims-install/setDatabase', {
            host: this.state.host.value,
            port: this.state.port.value,
            username: this.state.username.value,
            password: this.state.password.value
        }).then(res => {
            // 返回结果
            if (res.data.code === -1) {
                antd_1.message.error(res.data.message);
            }
            else {
                this.props.next();
            }
        });
    }
}
Index.defaultProps = {};
exports.default = Index;
