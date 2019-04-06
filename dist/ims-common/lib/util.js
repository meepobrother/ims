"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function omit(obj, fields) {
    const shallowCopy = {
        ...obj,
    };
    for (let i = 0; i < fields.length; i++) {
        const key = fields[i];
        delete shallowCopy[key];
    }
    return shallowCopy;
}
exports.omit = omit;
const classnames_1 = tslib_1.__importDefault(require("classnames"));
exports.classNames = classnames_1.default;
