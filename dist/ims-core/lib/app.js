"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.AppMetadataKey = 'AppMetadataKey';
exports.App = ims_common_1.makeDecorator(exports.AppMetadataKey);
function isAppClassAst(val) {
    return val.metadataKey === exports.AppMetadataKey;
}
exports.isAppClassAst = isAppClassAst;
class AppAst extends ims_common_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        this.addons = [];
        this.commands = [];
        const def = this.ast.metadataDef;
        if (def.addons)
            this.addons = Object.keys(def.addons).map(key => {
                const addon = def.addons[key];
                return context.visitType(addon);
            });
        if (def.commands)
            this.commands = Object.keys(def.commands).map(key => {
                const command = def.commands[key];
                return context.visitType(command);
            });
        this.name = def.name || ast.target.name;
        this.version = def.version;
        this.dev = !!def.dev;
    }
}
exports.AppAst = AppAst;
