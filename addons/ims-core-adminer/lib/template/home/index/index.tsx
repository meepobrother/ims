import React = require('react');
import { Button } from 'antd'
import "./index.less";
import { observer } from 'mobx-react'
import { AddonList } from '../../store/addon-list';
@observer
export default class Index extends React.Component<{ addonList: AddonList }, any> {
    componentDidMount() { }
    render() {
        const installProps: any = {
            style: {
                color: '#fff'
            }
        };
        return <div className="home-banner">
            <div className="bg"></div>
            <div className="home-banner-wrapper">
                <p className="desc">区块链联合运营框架</p>
                <Button type="ghost" {...installProps}>立即安装</Button>
            </div>
        </div>
    }
}
