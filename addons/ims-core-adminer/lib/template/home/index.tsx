import React, { Component } from "react";
import "./index.less";
import { observer } from 'mobx-react'
import AddonList from '../store/addon-list';

@observer
export default class Index extends Component<{ addonList: AddonList }, any> {
    componentDidMount() {}
    render() {
        return <div className="ims-adminer">home1</div>
    }
}
