"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PageHeader_1 = __importDefault(require("ant-design-pro/lib/PageHeader"));
const header = {};
class Index extends React.Component {
    render() {
        return <PageHeader_1.default {...header} title="模块市场" routes={[{ title: 'demo' }]} tabList={[{
                key: 'all',
                tab: '全部模块'
            }, {
                key: 'open',
                tab: '开发中'
            }, {
                key: 'close',
                tab: '众筹中'
            }]}></PageHeader_1.default>;
    }
}
exports.default = Index;
