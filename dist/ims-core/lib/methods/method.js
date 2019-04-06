"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
class HttpMethodContext extends ims_common_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = ast.metadataDef;
        if (def) {
            this.path = `/${def.path || ast.propertyKey}`;
        }
        else {
            this.path = `/${ast.propertyKey}`;
        }
    }
}
exports.HttpMethodContext = HttpMethodContext;
