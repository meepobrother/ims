"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.CliMetadataKey = 'CliMetadataKey';
exports.Cli = ims_decorator_1.makeDecorator(exports.CliMetadataKey);
function isCliClassAst(val) {
    return val.metadataKey === exports.CliMetadataKey;
}
exports.isCliClassAst = isCliClassAst;
class CliClassAst extends ims_decorator_1.ClassContext {
}
exports.CliClassAst = CliClassAst;
