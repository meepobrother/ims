import React, { Component } from "react";
import { Avatar } from 'antd'
import "./index.less";
import { observer, inject } from 'mobx-react'
import AddonList from '../store/addon-list';
@inject('addonList')
@observer
export default class Index extends Component<{ addonList: AddonList }, any> {
    componentDidMount() {
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        })
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        })
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        })
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        })
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        })
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        })
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        })
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        })
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        })
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        })
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        })
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        })
        this.props.addonList.addList({
            name: 'ims-member',
            title: '会员管理'
        })
        this.props.addonList.addList({
            name: 'ims-member1',
            title: '会员管理1'
        })
        this.props.addonList.addList({
            name: 'ims-member2',
            title: '会员管理2'
        })
        this.props.addonList.addList({
            name: 'ims-member3',
            title: '会员管理3'
        })
    }
    render() {
        const { addonList } = this.props;
        return <div className="ims-adminer">
            <ul>
                {addonList.list.map(app => <li key={app.name}>
                    <Avatar size="large" />
                    <div className="app-title">
                        {app.title}
                    </div>
                </li>)}
            </ul>
        </div>
    }
}
