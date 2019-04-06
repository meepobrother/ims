import { Controller, Post } from "ims-core";

@Controller({
    path: '/cloud'
})
export class ImsAddonsCloud {
    /**
     * 安装应用
     */
    @Post()
    install() { }
    /**
     * 卸载应用
     */
    @Post()
    uninstall() { }
}