"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_ui_1 = require("taro-ui");
const taro_1 = __importDefault(require("@tarojs/taro"));
class Index extends taro_1.default.Component {
    onPullDownRefresh() {
        taro_1.default.startPullDownRefresh();
        this.refresh();
    }
    refresh() {
        setTimeout(() => {
            taro_1.default.stopPullDownRefresh();
        }, 1000);
    }
    render() {
        return <taro_ui_1.AtNoticebar>
            AtNoticebar
        </taro_ui_1.AtNoticebar>;
    }
}
exports.default = Index;
