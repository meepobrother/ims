import { Type } from 'ims-decorator';
import { TransformOptions } from './type'
import WebSocket from 'ws';
import { ImsAddon } from './addon';
export const socketSet: Set<WebSocket> = new Set();
import { createAdmin } from 'ims-webpack-admin'
import { createMobile } from 'ims-webpack-mobile'

export class ImsApplication {
    static application: ImsApplication;
    addons: Map<Type<any>, ImsAddon> = new Map();
    constructor(public types: Type<any>[], public options: TransformOptions) {
        this.types.map(addon => {
            this.addons.set(addon, new ImsAddon(addon, this.options))
        });
        createAdmin(this.types);
        createMobile(this.types);
        ImsApplication.application = this;
    }
    // 安装
    installAddon(target: Type<any>) {
        this.types.push(target);
        this.addons.set(target, new ImsAddon(target, this.options))
    }
    // 卸载
    unInstallAddon(target: Type<any>) {
        const addon = this.addons.get(target);
        if (addon) {
            addon.uninstall();
            this.addons.delete(target);
            const index = this.types.indexOf(target);
            this.types.splice(index, 1);
        }
    }
    // 重新安装
    reInstall(target: Type<any>) {
        this.unInstallAddon(target);
        this.installAddon(target);
    }
    // 编译模板
    createTemplate() {
        createAdmin(this.types);
        createMobile(this.types);
    }
}
