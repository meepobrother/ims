import React = require('react');

import "./index.less";
import { observer } from 'mobx-react'
import AddonList from '../store/addon-list';

@observer
export default class Index extends React.Component<{ addonList: AddonList }, any> {
    componentDidMount() {}
    render() {
        return <div className="ims-adminer">home12</div>
    }
}
