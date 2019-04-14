"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const path_1 = require("path");
function handlerAddon(addon, router, callback) {
    try {
        const addonAst = addon.getClass(ims_core_1.AddonMetadataKey);
        const template = addonAst.getTemplateAst().getConfig();
        if (template) {
            if (template.admins)
                template.admins.map(admin => {
                    handlerRouter(admin, 'admin', router, callback);
                });
            if (template.mobiles)
                template.mobiles.map(admin => {
                    handlerRouter(admin, 'mobile', router, callback);
                });
        }
    }
    catch (e) {
        console.log(e.message);
    }
}
exports.default = handlerAddon;
function handlerRouter(irouter, type, router, callback) {
    const dist = path_1.join(process.cwd(), 'template', type, 'index.html');
    if (irouter.path) {
        if (irouter.redirect) {
            router.get(irouter.path, (req, res, next) => {
                res.redirect(irouter.redirect);
            });
            callback();
        }
        else {
            console.log(`handlerRouter: ${irouter.path}`);
            router.get(irouter.path, (req, res, next) => {
                console.log(`get template ${irouter.path}`);
                res.sendFile(dist);
            });
            callback();
        }
        if (irouter.routes && irouter.routes.length > 0) {
            irouter.routes.map(route => handlerRouter(route, type, router, callback));
        }
    }
}
