"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = __importDefault(require("ant-design-pro/lib/Exception"));
const React = require("react");
function Exception403() {
    return <Exception_1.default type="500" desc={<div>服务器错误!</div>} backText={"返回"}/>;
}
exports.default = Exception403;
