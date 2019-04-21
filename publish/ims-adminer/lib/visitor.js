"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_util_1 = __importDefault(require("ims-util"));
function parseInc(inc) {
    const context = ims_common_1.visitor.visitType(inc);
    const incAst = context.getClass(ims_core_1.ControllerMetadataKey);
    context.getProperty().map(pro => {
        if (pro instanceof ims_core_1.GetPropertyAst) {
            context.instance[pro.ast.propertyKey] = (...args) => {
                return ims_util_1.default.http.get(`${incAst.path}${pro.path || `/${pro.ast.propertyKey}`}`, {
                    params: {
                        __args: args
                    }
                }).then(res => res.data);
            };
        }
        if (pro instanceof ims_core_1.PostPropertyAst) {
            context.instance[pro.ast.propertyKey] = (...args) => {
                return ims_util_1.default.http.post(`${incAst.path}${pro.path || `/${pro.ast.propertyKey}`}`, {
                    __args: args
                }).then(res => res.data);
            };
        }
    });
    return context.instance;
}
exports.parseInc = parseInc;
