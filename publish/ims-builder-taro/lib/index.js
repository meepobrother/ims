"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const ims_core_1 = require("ims-core");
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const ims_node_1 = require("ims-node");
const root = process.cwd();
function buildTaro(type, watch) {
    return new Promise((resolve, reject) => {
        shelljs_1.exec(`taro build --type ${type} ${watch ? '--watch' : ''}`, {
            cwd: root
        }, (code, stdoutput, stderr) => {
            if (stderr)
                reject(stderr);
            resolve(stdoutput);
        });
    });
}
exports.buildTaro = buildTaro;
function createTaroPages(pages) {
    return `import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import './app.scss';
class App extends Taro.Component {
    config = {
        pages: ${JSON.stringify(pages)}
    }
    render() {
        return <View>View</View>
    }
}
Taro.render(<App />, document.getElementById('app'))`;
}
exports.createTaroPages = createTaroPages;
async function buildAppPages(context) {
    const addon = context.getClass(ims_core_1.AddonMetadataKey);
    const pages = [];
    const template = addon.getTemplate();
    template.mobiles.map(mobile => buildRouter(mobile, pages));
    // 复制文件
    const addonPath = path_1.join(root, 'src', addon.path);
    fs_extra_1.default.ensureDirSync(addonPath);
    await ims_node_1.copyDir(path_1.join(addon.sourceRoot, 'template/**/*'), addonPath);
    fs_extra_1.default.writeFileSync(path_1.join(root, 'src/app.tsx'), createTaroPages(pages));
}
exports.buildAppPages = buildAppPages;
function buildRouter(route, pages) {
    const path = route.path.substring(1);
    pages.push(path);
    if (route.routes) {
        route.routes.map(r => buildRouter(r, pages));
    }
}
