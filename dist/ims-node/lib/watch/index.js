"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const chokidar_1 = require("chokidar");
const ims_core_1 = require("ims-core");
const application_1 = require("../transform/application");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const change = new rxjs_1.Subject();
change.pipe(operators_1.debounceTime(500)).subscribe((sourceRoot) => {
    if (application_1.ImsApplication.application) {
        const type = require(sourceRoot).default;
        application_1.ImsApplication.application.reInstall(type);
    }
});
function watchAddon(type) {
    const context = ims_common_1.visitor.visitType(type);
    const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
    chokidar_1.watch(`${addonAst.sourceRoot}`).on('all', (eventName, path) => {
        change.next(addonAst.sourceRoot);
    });
}
exports.watchAddon = watchAddon;
