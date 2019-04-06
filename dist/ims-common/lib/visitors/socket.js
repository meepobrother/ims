"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
class SocketVisitor extends ims_common_1.NullAstVisitor {
    visitClass(ast, context) { }
    visitMethod(ast, context) {
        if (ims_common_1.isOnMethodAst(ast)) {
            return new ims_common_1.OnAst(ast, context);
        }
    }
    visitParameter(ast, context) {
        if (ims_common_1.isSocketParameterAst(ast)) {
            return new ims_common_1.SocketAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        if (ims_core_1.isServerPropertyAst(ast)) {
            return new ims_core_1.ServerAst(ast, context);
        }
    }
}
exports.SocketVisitor = SocketVisitor;
