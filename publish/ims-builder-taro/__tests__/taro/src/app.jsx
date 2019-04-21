"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = __importDefault(require("@tarojs/taro"));
const components_1 = require("@tarojs/components");
class App extends taro_1.default.Component {
    constructor() {
        super(...arguments);
        this.config = {
            pages: ["ims-demo/mobile/pages/index"]
        };
    }
    render() {
        return <components_1.View>View</components_1.View>;
    }
}
taro_1.default.render(<App />, document.getElementById('app'));
