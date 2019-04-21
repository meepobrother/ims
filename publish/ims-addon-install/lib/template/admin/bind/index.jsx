"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const antd_1 = require("antd");
const index_scss_1 = require("./index.scss");
const index_1 = __importDefault(require("../../inc/index"));
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: 'adminer',
            password: '',
            passwordStatus: '',
            repassword: '',
            repasswordStatus: '',
            usernameStatus: ''
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
        return <antd_1.Form className={index_scss_1.cx({ imsBind: true })} labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            <antd_1.Form.Item hasFeedback required validateStatus={this.state.usernameStatus} label="账户名">
                <antd_1.Input onChange={e => this.username(e.target.value)} value={this.state.username} placeholder="请输入用户名"/>
            </antd_1.Form.Item>
            <antd_1.Form.Item hasFeedback required validateStatus={this.state.passwordStatus} help={'密码长度至少6位'} label="密码">
                <antd_1.Input type="password" onChange={e => this.password(e.target.value)} placeholder="密码"/>
            </antd_1.Form.Item>
            <antd_1.Form.Item hasFeedback required validateStatus={this.state.repasswordStatus} label="确认密码">
                <antd_1.Input type="password" onChange={e => this.rePassword(e.target.value)} placeholder="确认密码"/>
            </antd_1.Form.Item>
            <antd_1.Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                <div className={index_scss_1.cx({ footerBar: true })}>
                    <antd_1.Button {...prevBtnProps}>上一步</antd_1.Button>
                    <antd_1.Button {...nextBtnProps}>下一步</antd_1.Button>
                </div>
            </antd_1.Form.Item>
        </antd_1.Form>;
    }
    username(val) {
        if (val.length > 0) {
            this.setState({
                username: val,
                usernameStatus: 'success'
            });
        }
        else {
            this.setState({
                username: val,
                usernameStatus: 'error'
            });
        }
    }
    next() {
        if (this.state.username.length > 0) {
            if (this.state.password.length > 0) {
                if (this.state.password === this.state.password) {
                    index_1.default.setUser({
                        username: this.state.username,
                        password: this.state.password
                    }).then(res => {
                        if (res.code === -1) {
                            antd_1.message.error(`${res.message}`);
                        }
                        else {
                            this.props.next();
                        }
                    });
                }
            }
            else {
                this.setState({
                    passwordStatus: 'error'
                });
            }
        }
        else {
            this.setState({
                usernameStatus: 'error'
            });
        }
    }
    password(val) {
        if (val.length > 6) {
            this.setState({
                password: val,
                passwordStatus: 'success'
            });
        }
        else {
            this.setState({
                password: val,
                passwordStatus: 'error'
            });
        }
    }
    rePassword(val) {
        if (val === this.state.password) {
            this.setState({
                repassword: val,
                repasswordStatus: 'success'
            });
        }
        else {
            this.setState({
                repassword: val,
                repasswordStatus: 'error'
            });
        }
    }
}
Index.defaultProps = {
    mobile: '',
    code: ''
};
exports.default = Index;
