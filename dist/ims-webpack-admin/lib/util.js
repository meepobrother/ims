"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const path_1 = require("path");
const fs = __importStar(require("fs-extra"));
const lodash_1 = require("lodash");
function createAdmin(context) {
    const appAst = context.getClass(ims_core_1.AppMetadataKey);
    let routers = [];
    const tempDir = path_1.join(__dirname, 'temp');
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        const template = addonAst.getTemplate();
        routers = routers.concat(...template.admins);
        routers = routers.concat(...template.mobiles);
    });
    const appPath = path_1.join(tempDir, 'app.tsx');
    fs.writeFileSync(appPath, template(routers, tempDir));
    return appPath;
}
exports.createAdmin = createAdmin;
function createMobile(context) {
    const appAst = context.getClass(ims_core_1.AppMetadataKey);
    let routers = [];
    const tempDir = path_1.join(__dirname, 'temp');
    appAst.addons.map(addon => {
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        const template = addonAst.getTemplate();
        // routers = routers.concat(...template.admins)
        routers = routers.concat(...template.mobiles);
    });
    const appPath = path_1.join(tempDir, 'app.tsx');
    fs.writeFileSync(appPath, template(routers, tempDir));
    return appPath;
}
exports.createMobile = createMobile;
const template = (routes, tempDir) => `import { bootstrap } from 'ims-adminer';
import "./app.css";
import "antd/dist/antd.css";
import React from 'react';
let routes = [${routes.map(route => createRouter(route, tempDir)).join(',')}];
bootstrap(routes);
`;
function createRouter(route, tempDir) {
    let res = `{\n`;
    Object.keys(route).map(key => {
        let val = route[key];
        if (key === 'component') {
            if (val || typeof val === 'undefined' || val === 'undefined') {
                val = `React.lazy(()=>import(/* webpackChunkName: "${lodash_1.kebabCase(route.path)}" */"${path_1.relative(tempDir, val)}"))`;
                res += `${key}:${val},\n`;
            }
        }
        else if (key === 'routes') {
            val = `[${route.routes && route.routes.map(route => createRouter(route, tempDir)).join(',')}]`;
            res += `${key}:${val},\n`;
        }
        else if (key === 'store') {
            res += `${key}:{`;
            Object.keys(val).map(key => {
                res += `${lodash_1.camelCase(key)}: require('${path_1.relative(tempDir, val[key])}').default,`;
            });
            res += `},\n`;
        }
        else {
            if (Array.isArray(val)) {
                res += `${key}:[${val.join(',')}],\n`;
            }
            else if (typeof val === 'string') {
                res += `${key}:"${val}",\n`;
            }
            else if (typeof val === 'object') {
                res += `${key}: ${JSON.stringify(val)}`;
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
