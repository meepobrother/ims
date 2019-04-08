"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Exception_1 = tslib_1.__importDefault(require("ant-design-pro/lib/Exception"));
const antd_1 = require("antd");
const react_1 = tslib_1.__importDefault(require("react"));
function Exception404() {
    return <Exception_1.default type="404" desc={<div><antd_1.Button type="dashed">抱歉，你访问的页面不存在</antd_1.Button></div>} backText={"返回"}/>;
}
exports.Exception404 = Exception404;
