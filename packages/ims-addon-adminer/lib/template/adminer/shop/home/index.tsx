import React = require('react');
import PageHeader from 'ant-design-pro/lib/PageHeader'
const header: any = {};
export default class Index extends React.Component<any, any> {
    render() {
        return <PageHeader {...header}
            title="模块市场"
            routes={[{ title: 'demo' }]}
            tabList={[{
                key: 'all',
                tab: '全部模块'
            }, {
                key: 'open',
                tab: '开发中'
            }, {
                key: 'close',
                tab: '众筹中'
            }]}
        ></PageHeader>
    }
}
