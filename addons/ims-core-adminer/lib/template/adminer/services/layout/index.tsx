import React = require('react');
import PageHeader from 'ant-design-pro/lib/PageHeader'
const header: any = {};
import './index.less';
import { inject, observer } from 'mobx-react';
import { ClusterHome } from '../list/store'
import List from '../list/index'
import Add from '../add/add'

@inject('home')
@observer
export default class Index extends React.Component<{ home?: ClusterHome, route?: any }, any> {
    componentDidMount() {
        this.props.home.getList();
    }
    render() {
        const { home } = this.props;
        return <div className="ims-adminer-manager-home-page">
            <PageHeader {...header}
                title="服务管理"
                wide={true}
                content={
                    <div>
                        <p>
                            服务可以将多台服务器联合，已达到实际业务中的并发需求!
                        </p>
                    </div>
                }
                tabList={[{ key: 'list', tab: '服务列表' }, { key: 'add', tab: '添加服务' }]}
                onTabChange={key => home.setActiveTab(key)}
                tabActiveKey={home.activeTab}
            >
            </PageHeader>
            <div className="main">
                {home.activeTab === 'list' ? <List /> : ''}
                {home.activeTab === 'add' ? <Add /> : ''}
            </div>
        </div>
    }
}
