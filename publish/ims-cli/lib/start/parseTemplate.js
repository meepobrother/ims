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
}
exports.parseTemplate = parseTemplate;
function handlerAddon(addon, router) {
    try {
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        const template = addonAst.getTemplateAst().getConfig();
        if (template) {
            if (template.admins)
                template.admins.map(admin => {
                    handlerRouter(admin, 'admin', router);
                });
            if (template.mobiles)
                template.mobiles.map(admin => {
                    handlerRouter(admin, 'mobile', router);
                });
        }
    }
    catch (e) {
        console.log(e.message);
    }
}
function handlerRouter(irouter, type, router) {
    const dist = path_1.join(process.cwd(), 'template', type, 'index.html');
    if (irouter.path) {
        if (irouter.redirect) {
            router.get(irouter.path, (req, res, next) => {
                res.redirect(irouter.redirect);
            });
        }
        else {
            console.log(`handlerRouter: ${irouter.path}`);
            router.get(irouter.path, (req, res, next) => {
                console.log(`get template ${irouter.path}`);
                res.sendFile(dist);
            });
        }
        if (irouter.routes && irouter.routes.length > 0) {
            irouter.routes.map(route => handlerRouter(route, type, router));
        }
    }
}
