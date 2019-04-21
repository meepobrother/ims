import React = require('react');
import { observer, inject } from 'mobx-react'

@inject('union')
@observer
export default class Index extends React.Component<any, any> {
    componentDidMount() {
        this.props.union.getUnionList()
    }
    render() {
        return <div>联盟</div>
    }
}
