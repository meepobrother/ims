"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PageHeader_1 = __importDefault(require("ant-design-pro/lib/PageHeader"));
const antd_1 = require("antd");
const header = {};
require("./index.less");
class Index extends React.Component {
    render() {
        return <div className="ims-adminer-manager-home-page">
            <PageHeader_1.default {...header} title="模块管理" tabList={[{
                key: 'all',
                tab: '全部模块'
            }, {
                key: 'open',
                tab: '已启动模块'
            }, {
                key: 'close',
                tab: '未启动模块'
            }]} tabDefaultActiveKey="all" tabBarExtraContent={<a href="javascript:;">挑选模块</a>} onTabChange={(key) => {
            console.log(key);
        }} itemRender={(item) => {
            console.log(item);
        }} wide={true} action={<a href="javascript:;">模块商城</a>} content={<div>
                        <p>
                            每个模块都有一个独立的进程负责，您可以根据您的业务需求，随时随地关闭或启动某个或某几个服务!
                        </p>
                    </div>}>
            </PageHeader_1.default>
            <div className="main">
                <antd_1.List grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }} dataSource={[{}, {}, {}, {}, {}, {}]} renderItem={(item) => {
            return <antd_1.List.Item>
                            <antd_1.Card hoverable actions={[
                <a>启动</a>,
                <a>重启</a>,
                <a>暂停</a>,
                <a>卸载</a>
            ]}>
                                demo
                        </antd_1.Card>
                        </antd_1.List.Item>;
        }}></antd_1.List>
            </div>
        </div>;
    }
}
exports.default = Index;
