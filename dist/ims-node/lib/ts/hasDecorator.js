"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isDecorator_1 = require("./isDecorator");
exports.hasControllerDecorator = hasClassDecorator('Controller');
function hasClassDecorator(name) {
    return (node) => {
        return node.decorators.some(it => {
            return isDecorator_1.isDecorator(name)(it);
        });
    };
}
exports.hasClassDecorator = hasClassDecorator;
exports.hasMethodGetDecorator = hasMethodDecorator('Get');
exports.hasMethodPostDecorator = hasMethodDecorator('Post');
exports.hasMethodPutDecorator = hasMethodDecorator('Put');
exports.hasMethodDeleteDecorator = hasMethodDecorator('Delete');
exports.hasMethodPatchDecorator = hasMethodDecorator('Patch');
exports.hasMethodHeadDecorator = hasMethodDecorator('Head');
exports.hasMethodAllDecorator = hasMethodDecorator('All');
exports.hasMethodRoleDecorator = hasMethodDecorator('Role');
function hasMethodDecorator(name) {
    return (node) => {
        return node.decorators.some(it => {
            return isDecorator_1.isDecorator(name)(it);
        });
    };
}
exports.hasMethodDecorator = hasMethodDecorator;
