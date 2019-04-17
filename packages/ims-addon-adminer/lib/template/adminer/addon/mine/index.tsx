import React = require('react');
import { Table, Button } from 'antd'
const tableProps: any = {};
import { AddonMine } from './store'
import { inject, observer } from 'mobx-react'
const btnProps: any = {};
@inject('mine')
@observer
export default class Index extends React.Component<{ mine: AddonMine }, any> {
    componentDidMount() {
        this.props.mine.getMineAddons();
    }
    render() {
        const { mine } = this.props;
        const columns = [...mine.columns, {
            title: '操作',
            render: (item) => {
                console.log(item)
                return <div>
                    <Button {...btnProps} type="default" shape="circle" icon="desktop"></Button>
                    &nbsp;
                    <Button {...btnProps} type="default" shape="circle" icon="edit"></Button>
                    &nbsp;
                    <Button {...btnProps} type="primary" icon="cloud"></Button>
                </div>
            }
        }]
        return <Table {...tableProps} dataSource={mine.list} columns={columns} ></Table>
    }
}