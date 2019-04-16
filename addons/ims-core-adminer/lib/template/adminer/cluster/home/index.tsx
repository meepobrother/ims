import React = require('react');
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { List, Card } from 'antd'
const header: any = {};
import './index.less';
export default class Index extends React.Component<any, any> {
    render() {
        return <div className="ims-adminer-manager-home-page">
            <PageHeader {...header}
                title="集群管理"
                wide={true}
                action={
                    <a href="javascript:;">添加服务</a>
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
                <List
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={[{}, {}, {}, {}, {}, {}]}
                    renderItem={(item) => {
                        return <List.Item>
                            <Card hoverable actions={[
                                <a>编辑</a>,
                                <a>移除</a>
                            ]}>
                                localhost:4200
                        </Card>
                        </List.Item>
                    }}></List>
            </div>
        </div>
    }
}
