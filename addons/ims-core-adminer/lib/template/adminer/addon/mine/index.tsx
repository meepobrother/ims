import React = require('react');
import { Table } from 'antd'
const tableProps: any = {};
import { AddonMine } from './store'
import { inject, observer } from 'mobx-react'

@inject('mine')
@observer
export default class Index extends React.Component<{ mine: AddonMine }, any> {
    componentDidMount() {
        this.props.mine.getMineAddons();
    }
    render() {
        const { mine } = this.props;
        return <Table {...tableProps} dataSource={mine.list} columns={mine.columns} ></Table>
    }
}