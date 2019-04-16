import React = require('react');
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { List, Card } from 'antd'
const header: any = {};
import './index.less';
export default class Index extends React.Component<any, any> {
    render() {
        return <div className="ims-adminer-manager-home-page">
            <PageHeader {...header}
                title="模块管理"
                tabList={[{
                    key: 'all',
                    tab: '全部模块'
                }, {
                    key: 'open',
                    tab: '已启动模块'
                }, {
                    key: 'close',
                    tab: '未启动模块'
                }]}
                tabDefaultActiveKey="all"
                tabBarExtraContent={
                    <a href="javascript:;">挑选模块</a>
                }
                onTabChange={(key: string) => {
                    console.log(key)
                }}
                itemRender={(item) => {
                    console.log(item)
                }}
                wide={true}
                action={
                    <a href="javascript:;">模块商城</a>
                }
                content={
                    <div>
                        <p>
                            每个模块都有一个独立的进程负责，您可以根据您的业务需求，随时随地关闭或启动某个或某几个服务!
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
                                <a>启动</a>,
                                <a>重启</a>,
                                <a>暂停</a>,
                                <a>卸载</a>
                            ]}>
                                demo
                        </Card>
                        </List.Item>
                    }}></List>
            </div>
        </div>
    }
}
