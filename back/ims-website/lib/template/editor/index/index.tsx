import React, { Component } from 'react';
import IFrame from './components/Iframe/index';
import "./index.less"
export default class Index extends Component {
    static defaultProps = {
        className: 'edit-stage'
    }
    render() {
        return <div className="edit-stage-wrapper">
            <IFrame />
        </div>
    }
}