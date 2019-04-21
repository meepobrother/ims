"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
class HttpMethodContext extends ims_decorator_1.MethodContext {
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
class HttpPropertyContext extends ims_decorator_1.PropertyContext {
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
exports.HttpPropertyContext = HttpPropertyContext;
