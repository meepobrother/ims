import React = require('react');
import './index.less';
import { inject, observer } from 'mobx-react';
import { Link } from 'ims-adminer'
@observer
export default class Index extends React.Component<{ route?: any }, any> {
    componentDidMount() {
    }
    render() {
        return <div className="ims-adminer-manager-home-page">
            <Link to="/adminer/member/list">参数配置</Link>
            <Link to="/adminer/fans/list">支付配置</Link>
        </div>
    }
}
