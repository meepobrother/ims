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
            <Link to="/adminer/member/list">会员管理</Link>
            <Link to="/adminer/fans/list">粉丝管理</Link>
            <Link to="/adminer/message/list">留言管理</Link>
        </div>
    }
}
