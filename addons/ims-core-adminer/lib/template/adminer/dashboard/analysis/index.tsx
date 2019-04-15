import React = require('react');
import { MiniArea } from 'ant-design-pro/lib/Charts';
import { Analysis } from './store'
import { observer, inject } from 'mobx-react'

@inject('analysis', 'role')
@observer
export default class Index extends React.Component<{ analysis?: Analysis, role: any }, any> {
    componentDidMount() {
        this.props.analysis.analysis();
    }
    render() {
        const { analysis, role } = this.props;
        console.log({ analysis, role })
        return <div>analysis222</div>
    }
}