import React = require('react');
import "./index.less";
import { ImsRoutes } from 'ims-adminer'
export default class Index extends React.Component<any, any> {
    render() {
        return <ImsRoutes route={this.props.route} />
    }
}