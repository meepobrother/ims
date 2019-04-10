"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class SocketVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) { }
    visitMethod(ast, context) {
        if (ims_core_1.isOnMethodAst(ast)) {
            return new ims_core_1.OnAst(ast, context);
        }
        if (ims_core_1.isP2pMethodAst(ast)) {
            return new ims_core_1.P2pAst(ast, context);
        }
    }
    visitParameter(ast, context) {
        if (ims_core_1.isSocketParameterAst(ast)) {
            return new ims_core_1.SocketAst(ast, context);
        }
        if (ims_core_1.isP2pParameterAst(ast)) {
            return new ims_core_1.P2pParameterAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        if (ims_core_1.isServerPropertyAst(ast)) {
            return new ims_core_1.ServerAst(ast, context);
        }
    }
}
exports.SocketVisitor = SocketVisitor;
