"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const path_1 = require("path");
const fs = tslib_1.__importStar(require("fs-extra"));
function createAdmin(context) {
    const appAst = context.getClass(ims_common_1.AppMetadataKey);
    let routers = [];
    const tempDir = path_1.join(__dirname, 'temp');
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(ims_common_1.AddonMetadataKey);
        const template = addonAst.getTemplate();
        routers = routers.concat(...template.admins);
        routers = routers.concat(...template.mobiles);
    });
    const appPath = path_1.join(tempDir, 'app.tsx');
    fs.writeFileSync(appPath, template(routers, tempDir));
    return appPath;
}
exports.createAdmin = createAdmin;
const template = (routes, tempDir) => `import { bootstrap } from './bootstrap';
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
`;
function createRouter(route, tempDir) {
    let res = `{\n`;
    Object.keys(route).map(key => {
        let val = route[key];
        if (key === 'component') {
            if (val || typeof val === 'undefined' || val === 'undefined') {
                val = `React.lazy(()=>import("${path_1.relative(tempDir, val)}"))`;
                res += `${key}:${val},\n`;
            }
        }
        else if (key === 'routes') {
            val = `[${route.routes && route.routes.map(route => createRouter(route, tempDir)).join(',')}]`;
            res += `${key}:${val},\n`;
        }
        else {
            if (Array.isArray(val)) {
                res += `${key}:[${val.join(',')}],\n`;
            }
            else if (typeof val === 'string') {
                res += `${key}:"${val}",\n`;
            }
            else {
                if (val)
                    res += `${key}:${val},\n`;
            }
        }
    });
    res += '}';
    return res;
}
