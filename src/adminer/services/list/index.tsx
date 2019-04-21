import React = require('react');
import { Table } from 'antd'
import './index.less';
import { inject, observer } from 'mobx-react';
import { ClusterHome } from './store'
@inject('home')
@observer
export default class Index extends React.Component<{ home?: ClusterHome }, any> {
    componentDidMount() {
        this.props.home.getList();
    }
    render() {
        const { home } = this.props;
        return <Table dataSource={home.list} columns={home.columns}></Table>
    }
}
