import { TransformOptions } from './type';
import { Type, TypeContext } from 'ims-decorator';
import { Router } from 'express'
import { AddonMetadataKey, AddonAst } from 'ims-core';
import { visitor } from 'ims-common';
import transformHttp from './http'
import transformRole from './role'
import transformP2p from './p2p'
import transformSocket from './socket'
import transformTemplate from './template';

interface ImsAddonUninstall {
    (options: TransformOptions): any;
}
export class ImsAddon {
    uninstalls: ImsAddonUninstall[] = [];
    private router = Router();
    constructor(public target: Type<any>, public options: TransformOptions) {
        console.log(`create addon ${target.name}`)
        const addon = visitor.visitType(target);
        const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
        const incs = addonAst.incs;
        incs.map(inc => {
            this.install(inc)
        });
        console.log(`create addon path ${addonAst.path}`)
        options.app.use(addonAst.path, this.router);
        const stack = options.app._router.stack;
        const last = stack[stack.length - 1];
        this.uninstalls.push((options) => {
            const index = options.app._router.stack.indexOf(last)
            options.app._router.stack.splice(index, 1)
        });
        // 解析template
        transformTemplate(addon, this.options.app, () => {
            const stack = options.app._router.stack;
            const last = stack[stack.length - 1];
            this.uninstalls.push((options) => {
                const index = options.app._router.stack.indexOf(last)
                options.app._router.stack.splice(index, 1)
            });
        });
    }

    private install(inc: TypeContext) {
        console.log(`create addon inc ${inc.target.name}`)
        console.log(`create addon inc classes ${inc.classes.length}`)
        console.log(`create addon inc propertys ${inc.propertys.length}`)
        console.log(`create addon inc methods ${inc.methods.length}`)
        // 解析role
        transformRole(inc, this.options);
        this.uninstalls.push((options) => {
            inc.set('role', new Map())
        });
        // 解析p2p
        transformP2p(inc, this.options);
        // 解析socket
        transformSocket(inc, this.options);
        // 解析http
        const path = transformHttp(inc, this.options);
        console.log(`create addon inc router ${path.path}`)
        this.router.use(path.path, path.router);
        const stack = this.router.stack[this.router.stack.length - 1];
        this.uninstalls.push(options => {
            const index = this.router.stack.indexOf(stack);
            this.router.stack.splice(index, 1)
        });
    }

    uninstall() {
        this.uninstalls.map(uninstall => uninstall(this.options));
    }
}