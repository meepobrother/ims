import { exec } from 'shelljs';
import { IRouter, AddonMetadataKey, AddonAst } from 'ims-core'
import { TypeContext } from 'ims-decorator';
import { join } from 'path';
import fs from 'fs-extra';
import { copyDir } from 'ims-node';
const root = process.cwd();
export function buildTaro(type: 'weapp' | 'h5', watch: boolean) {
    return new Promise((resolve, reject) => {
        exec(`taro build --type ${type} ${watch ? '--watch' : ''}`, {
            cwd: root
        }, (code, stdoutput, stderr) => {
            if (stderr) reject(stderr)
            resolve(stdoutput)
        });
    })
}

export function createTaroPages(pages: string[]) {
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
Taro.render(<App />, document.getElementById('app'))`
}

export async function buildAppPages(context: TypeContext) {
    const addon = context.getClass(AddonMetadataKey) as AddonAst;
    const pages = [];
    const template = addon.getTemplate();
    template.mobiles.map(mobile => buildRouter(mobile, pages));
    // 复制文件
    const addonPath = join(root, 'src', addon.path)
    fs.ensureDirSync(addonPath);
    await copyDir(join(addon.sourceRoot, 'template/**/*'), addonPath)
    fs.writeFileSync(join(root, 'src/app.tsx'), createTaroPages(pages))
}

function buildRouter(route: IRouter, pages: string[]) {
    const path = route.path.substring(1);
    pages.push(path);
    if (route.routes) {
        route.routes.map(r => buildRouter(r, pages));
    }
}
