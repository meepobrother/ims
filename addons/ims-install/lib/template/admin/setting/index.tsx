import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { cx } from './index.scss';
import util from 'ims-util';
import { ValidateStatus } from 'ims-adminer'
interface IndexProps {
    next?: any;
    prev?: any;
}
interface FormItem {
    hasFeedback: boolean;
    required: boolean;
    validateStatus: ValidateStatus;
    label: string;
    value: any;
    placeholder: string;
}
interface IndexState {
    host?: FormItem;
    port?: FormItem;
    username?: FormItem;
    password?: FormItem;
}
export default class Index extends Component<IndexProps, IndexState> {
    static defaultProps: IndexProps = {}
    state: IndexState = {
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
    }
    constructor(props: IndexProps) {
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
        const { username, host, port, password } = this.state;
        return <Form className={cx({ imsSetting: true })} labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            <Form.Item {...host}>
                <Input value={host.value} onChange={e => this.setHost(e.target.value)} placeholder={host.placeholder} />
            </Form.Item>
            <Form.Item {...port}>
                <Input value={port.value} onChange={e => this.setPort(e.target.value)} placeholder={port.placeholder} />
            </Form.Item>
            <Form.Item {...username}>
                <Input value={username.value} onChange={e => this.setUsername(e.target.value)} placeholder={username.placeholder} />
            </Form.Item>
            <Form.Item {...password}>
                <Input type="password" value={password.value} onChange={e => this.setPassword(e.target.value)} placeholder={password.placeholder} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                <div className={cx({ footerBar: true })}>
                    <Button {...prevBtnProps} >上一步</Button>
                    <Button {...nextBtnProps} >下一步</Button>
                </div>
            </Form.Item>
        </Form>
    }

    setUsername(val: string) {
        this.setState({
            username: {
                ...this.state.username,
                value: val,
                validateStatus: 'success'
            }
        })
    }
    setPassword(val: string) {
        this.setState({
            password: {
                ...this.state.password,
                value: val,
                validateStatus: 'success'
            }
        })
    }
    setHost(val: string) {
        this.setState({
            host: {
                ...this.state.host,
                value: val,
                validateStatus: 'success'
            }
        })
    }
    setPort(val: string) {
        this.setState({
            port: {
                ...this.state.port,
                value: val,
                validateStatus: 'success'
            }
        })
    }

    next() {
        if (this.state.host.value.length <= 0) {
            return this.setState({
                host: {
                    ...this.state.host,
                    validateStatus: 'error'
                }
            })
        }
        if (this.state.password.value.length <= 0) {
            return this.setState({
                password: {
                    ...this.state.password,
                    validateStatus: 'error'
                }
            })
        }
        if (this.state.username.value.length <= 0) {
            return this.setState({
                username: {
                    ...this.state.username,
                    validateStatus: 'error'
                }
            })
        }
        if (this.state.port.value.length <= 0) {
            return this.setState({
                port: {
                    ...this.state.port,
                    validateStatus: 'error'
                }
            })
        }
        // 配置并连接数据库
        util.http.post('ims-install/setDatabase', {
            host: this.state.host.value,
            port: this.state.port.value,
            username: this.state.username.value,
            password: this.state.password.value
        }).then(res => {
            // 返回结果
            if (res.data.code === -1) {
                message.error(res.data.message)
            } else {
                this.props.next();
            }
        })
    }
}