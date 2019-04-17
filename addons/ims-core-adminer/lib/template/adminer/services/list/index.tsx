import React = require('react');
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { List, Card, Table } from 'antd'
const header: any = {};
import './index.less';
import { inject, observer } from 'mobx-react';
import { ClusterHome } from './store'
@inject('home')
@observer
export default class Index extends React.Component<{ home?: ClusterHome }, any> {
    componentDidMount() {
        this.props.home.getList();
    }
    render() {
        const { home } = this.props;
        return <div className="ims-adminer-manager-home-page">
            <PageHeader {...header}
                title="服务管理"
                wide={true}
                action={
                    <div>
                        <a href="javascript:;" onClick={() => home.addCluster()}>添加服务</a>
                    </div>
                }
                content={
                    <div>
                        <p>
                            集群可以将多台服务器联合提供服务，已达到实际业务中的并发需求!
                        </p>
                    </div>
                }
            >
            </PageHeader>
            <div className="main">
                <Table dataSource={home.list} columns={home.columns}></Table>
                {/* <List
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={home.list}
                    renderItem={(item: any) => {
                        return <List.Item>
                            <Card title={item.name} hoverable actions={[
                                <a>编辑</a>,
                                <a>移除</a>
                            ]}>
                                {item.upstream.map((it, key) => {
                                    return <div key={key}>{it.ip}:{it.port}</div>
                                })}
                            </Card>
                        </List.Item>
                    }}></List> */}
            </div>
        </div>
    }
}
