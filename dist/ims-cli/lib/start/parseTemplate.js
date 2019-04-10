"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const path_1 = require("path");
function parseTemplate(addons, app, root) {
    addons.map(addon => {
        const context = ims_common_1.visitor.visitType(addon);
        handlerAddon(context, app);
    });
    const adminDist = path_1.join(root, 'template', 'admin', 'index.html');
    const mobileDist = path_1.join(root, 'template', 'mobile', 'index.html');
    app.get('/', (req, res, next) => {
        res.sendFile(adminDist);
    });
    app.get('/app', (req, res, next) => {
        res.sendFile(mobileDist);
    });
}
exports.parseTemplate = parseTemplate;
function handlerAddon(addon, router) {
    try {
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        const templateAst = addonAst.getTemplateAst();
        if (templateAst) {
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
    catch (e) {
        console.log(e.message);
    }
}
function handlerRouter(context, addon, type, router) {
    const routerAst = context.getClass(ims_core_1.RouterMetadataKey);
    if (routerAst) {
        const dist = path_1.join(process.cwd(), 'template', type, 'index.html');
        const def = Object.assign({}, routerAst.ast.metadataDef);
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
