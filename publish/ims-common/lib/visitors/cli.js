"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class CliVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        if (ims_core_1.isCliClassAst(ast)) {
            return new ims_core_1.CliClassAst(ast, context);
        }
        if (ims_core_1.isCommandClassAst(ast)) {
            return new ims_core_1.CommandClassAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        if (ims_core_1.isInputPropertyAst(ast)) {
            return new ims_core_1.InputAst(ast, context);
        }
        if (ims_core_1.isVersionPropertyAst(ast)) {
            return new ims_core_1.VersionAst(ast, context);
        }
        if (ims_core_1.isOptionPropertyAst(ast)) {
            return new ims_core_1.OptionPropertyAst(ast, context);
        }
    }
}
exports.CliVisitor = CliVisitor;
