import { Avatar } from 'antd'
import React = require('react');
import "./index.less";
import { observer, inject } from 'mobx-react'
import { AddonList } from '../../store/addon-list';
@inject('addonList')
@observer
export default class Index extends React.Component<{ addonList: AddonList }, any> {
    componentDidMount() { }
    render() {
        const { addonList } = this.props;
        return <div className="ims-adminer">
            <ul>
                {addonList.list.map(app => <li key={app.name}>
                    <Avatar icon={app.icon} size="large" />
                    <div className="app-title">
                        {app.title}
                    </div>
                </li>)}
            </ul>
        </div>
    }
}
