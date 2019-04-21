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
const ims_common_1 = require("ims-common");
const root = process.cwd();
function createAdmin(addons) {
    let routers = [];
    const tempDir = path_1.join(root, 'data/temp');
    fs.ensureDirSync(tempDir);
    addons.map(src => {
        const addon = require(src).default;
        const context = ims_common_1.visitor.visitType(addon);
        const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
        const template = addonAst.getTemplate();
        routers = routers.concat(...template.admins);
        routers = routers.concat(...template.mobiles);
    });
    const appPath = path_1.join(tempDir, 'app.js');
    fs.writeFileSync(appPath, template(routers, tempDir));
    return appPath;
}
exports.createAdmin = createAdmin;
const template = (routes, tempDir) => `const adminer = require('ims-adminer')
require("normalize.css");
require("antd/dist/antd.css");
const React = require('react');
let routes = [${routes.map(route => createRouter(route, tempDir)).join(',')}];
adminer.bootstrap(routes);
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
        else if (key === 'roles') {
            res += `roles:${JSON.stringify(val)},`;
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
