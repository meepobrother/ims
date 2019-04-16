import React = require('react');
import { Table } from 'antd'
const tableProps: any = {};
export default class Index extends React.Component<any, any> {
    render() {
        return <Table {...tableProps} dataSource={[]} columns={[]} ></Table>
    }
}