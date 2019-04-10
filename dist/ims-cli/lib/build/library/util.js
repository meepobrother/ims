"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function camel2Dash(_str) {
    const str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}
exports.camel2Dash = camel2Dash;
function camel2Underline(_str) {
    const str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
}
exports.camel2Underline = camel2Underline;
function winPath(path) {
    return path.replace(/\\/g, '/');
}
exports.winPath = winPath;
