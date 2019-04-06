import { IRouter, } from 'ims-core';
import { TypeContext } from 'ims-decorator'
import { AppMetadataKey, AppAst, AddonMetadataKey, AddonAst } from 'ims-core';
import { join, relative } from 'path';
import * as fs from 'fs-extra';

export function createAdmin(context: TypeContext) {
    const appAst = context.getClass(AppMetadataKey) as AppAst;
    let routers: any[] = [];
    const tempDir = join(__dirname, 'temp');
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
        const template = addonAst.getTemplate();
        routers = routers.concat(...template.admins)
        routers = routers.concat(...template.mobiles)
    });
    const appPath = join(tempDir, 'app.tsx');
    fs.writeFileSync(appPath, template(routers, tempDir));
    return appPath;
}

const template = (routes: IRouter[], tempDir: string) =>
    `import { bootstrap } from './bootstrap';
import { store } from 'ims-adminer';
import "./app.css";
import React from 'react';
let routes = [${routes.map(route => createRouter(route, tempDir)).join(',')}];
store.dispatch({
    type: '__init__',
    payload: {
        routes
    }
});
bootstrap(routes);
`

function createRouter(route: IRouter, tempDir: string) {
    let res = `{\n`;
    Object.keys(route).map(key => {
        let val: string = route[key];
        if (key === 'component') {
            if (val || typeof val === 'undefined' || val === 'undefined') {
                val = `React.lazy(()=>import("${relative(tempDir, val)}"))`;
                res += `${key}:${val},\n`;
            }
        } else if (key === 'routes') {
            val = `[${route.routes && route.routes.map(route => createRouter(route, tempDir)).join(',')}]`
            res += `${key}:${val},\n`;
        } else {
            if (Array.isArray(val)) {
                res += `${key}:[${val.join(',')}],\n`
            } else if (typeof val === 'string') {
                res += `${key}:"${val}",\n`
            } else {
                if (val) res += `${key}:${val},\n`
            }
        }
    });
    res += '}';
    return res;
}