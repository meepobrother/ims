"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class SocketVisitor extends ims_decorator_1.NullAstVisitor {
    visitMethod(ast, context) {
        if (ims_core_1.isSocketMethodAst(ast)) {
            return new ims_core_1.SocketMethodAst(ast, context);
        }
    }
    visitParameter(ast, context) {
        if (ims_core_1.isSocketParameterAst(ast)) {
            return new ims_core_1.SocketParameterAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        if (ims_core_1.isP2pPrototypeAst(ast)) {
            return new ims_core_1.P2pPropertyAst(ast, context);
        }
    }
}
exports.SocketVisitor = SocketVisitor;
