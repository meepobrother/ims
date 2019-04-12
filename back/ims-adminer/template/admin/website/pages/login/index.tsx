import { Component } from 'react';
import React = require('react');

import Login from 'ant-design-pro/lib/Login'
export default class Index extends Component {
    render() {
        return <Login defaultActiveKey="tab1">
            <Login.Tab key="tab1" tab={'Login'} tabUtil={
                { addTab: () => { }, removeTab: () => { } }
            }>
            </Login.Tab>
            <Login.Tab key="tab2" tab={'Register'} tabUtil={
                { addTab: () => { }, removeTab: () => { } }
            }>
            </Login.Tab>
        </Login>
    }
}