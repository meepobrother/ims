"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = __importDefault(require("ant-design-pro/lib/Exception"));
const React = require("react");
function Exception403() {
    return <Exception_1.default type="403" desc={<div>抱歉，权限不足!</div>} backText={"换个账号登录"} redirect={'/home/login'}/>;
}
exports.default = Exception403;
