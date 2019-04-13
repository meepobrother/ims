import React, { Component } from 'react'
import { Button, Input, Form, message } from 'antd';
import { cx } from './index.scss'
import util from 'ims-util'
interface IndexProps {
    next?: any;
    prev?: any;
}
interface IndexState {
    username?: string;
    password?: string;
    repassword?: string;
    loading?: boolean;
    usernameStatus?: "success" | "warning" | "error" | "validating" | "";
    passwordStatus?: "success" | "warning" | "error" | "validating" | "";
    repasswordStatus?: "success" | "warning" | "error" | "validating" | "";
}
export default class Index extends Component<IndexProps, IndexState> {
    static defaultProps = {
        mobile: '',
        code: ''
    }
    state: IndexState = {
        loading: false,
        username: 'adminer',
        password: '',
        passwordStatus: '',
        repassword: '',
        repasswordStatus: '',
        usernameStatus: ''
    }
    constructor(props) {
        super(props);
    }
    render() {
        const nextBtnProps: any = {
            type: "primary",
            onClick: () => this.next()
        }
        const prevBtnProps: any = {
            onClick: () => this.props.prev()
        }
        return <Form className={cx({ imsBind: true })} labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            <Form.Item hasFeedback required validateStatus={this.state.usernameStatus} label="账户名">
                <Input onChange={e => this.username(e.target.value)} value={this.state.username} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item hasFeedback required validateStatus={this.state.passwordStatus} help={'密码长度至少6位'} label="密码">
                <Input type="password" onChange={e => this.password(e.target.value)} placeholder="密码" />
            </Form.Item>
            <Form.Item hasFeedback required validateStatus={this.state.repasswordStatus} label="确认密码">
                <Input type="password" onChange={e => this.rePassword(e.target.value)} placeholder="确认密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                <div className={cx({ footerBar: true })}>
                    <Button {...prevBtnProps}>上一步</Button>
                    <Button {...nextBtnProps} >下一步</Button>
                </div>
            </Form.Item>
        </Form>
    }

    username(val: string) {
        if (val.length > 0) {
            this.setState({
                username: val,
                usernameStatus: 'success'
            })
        } else {
            this.setState({
                username: val,
                usernameStatus: 'error'
            })
        }
    }

    next() {
        if (this.state.username.length > 0) {
            if (this.state.password.length > 0) {
                if (this.state.password === this.state.password) {
                    util.http.post('/ims-install/setUser', {
                        username: this.state.username,
                        password: this.state.password
                    }).then(res => {
                        if (res.data.code === -1) {
                            message.error(`${res.data.message}`)
                        } else {
                            this.props.next();
                        }
                    })
                }
            } else {
                this.setState({
                    passwordStatus: 'error'
                })
            }
        } else {
            this.setState({
                usernameStatus: 'error'
            })
        }
    }

    password(val: string) {
        if (val.length > 6) {
            this.setState({
                password: val,
                passwordStatus: 'success'
            })
        } else {
            this.setState({
                password: val,
                passwordStatus: 'error'
            });
        }
    }

    rePassword(val: string) {
        if (val === this.state.password) {
            this.setState({
                repassword: val,
                repasswordStatus: 'success'
            });
        } else {
            this.setState({
                repassword: val,
                repasswordStatus: 'error'
            });
        }
    }
}