import { Component } from 'react';
import React = require('react');

// 基础信息
import util from 'ims-util'
export default class Index extends Component {
    render() {
        return <div>
            <button onClick={() => this.send()}>基础信息</button>
        </div>
    }

    send() {
        util.http.get('/testp2p')({}).then(res => {
            console.log(res)
        })
    }
}