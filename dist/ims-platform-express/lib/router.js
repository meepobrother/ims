"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const path_1 = require("path");
const fs_1 = require("fs");
function default_1(context, app) {
    const appAst = context.getClass(ims_common_1.AppMetadataKey);
    const adminDist = path_1.join(process.cwd(), 'template', 'admin', 'index.html');
    const mobileDist = path_1.join(process.cwd(), 'template', 'mobile', 'index.html');
    app.use((req, res, next) => {
        const installed = fs_1.existsSync(path_1.join(process.cwd(), 'config/install.loc'));
        if (!installed) {
            if (req.path.startsWith('/ims-install')) {
                next();
            }
            else {
                return res.redirect('/ims-install');
            }
        }
        else {
            next();
        }
    });
    appAst.addons.map(addon => {
        handlerAddon(addon, app);
    });
    app.get('/', (req, res, next) => {
        res.sendFile(adminDist);
    });
    app.get('/app', (req, res, next) => {
        res.sendFile(mobileDist);
    });
}
exports.default = default_1;
function handlerAddon(addon, router) {
    const addonAst = addon.getClass(ims_common_1.AddonMetadataKey);
    const template = addonAst.template;
    if (template) {
        const templateAst = template.getClass(ims_common_1.TemplateMetadataKey);
        if (templateAst.admins)
            templateAst.admins.map(admin => {
                handlerRouter(admin, addon, 'admin', router);
            });
        if (templateAst.mobiles)
            templateAst.mobiles.map(admin => {
                handlerRouter(admin, addon, 'mobile', router);
            });
    }
}
function handlerRouter(context, addon, type, router) {
    const routerAst = context.getClass(ims_common_1.RouterMetadataKey);
    if (routerAst) {
        const dist = path_1.join(process.cwd(), 'template', type, 'index.html');
        const def = { ...routerAst.ast.metadataDef };
        const path = routerAst.getPath();
        if (Array.isArray(routerAst.routes)) {
            routerAst.routes.map(route => {
                handlerRouter(route, addon, type, router);
            });
        }
        if (def.redirect) {
            routerAst.redirect = routerAst.getRedirect();
            if (def.path) {
                router.get(path, (req, res, next) => {
                    res.redirect(routerAst.redirect);
                });
            }
        }
        router.get(path, (req, res, next) => {
            res.sendFile(dist);
        });
    }
}
