"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isDecorator_1 = require("./isDecorator");
function hasClassDecorator(name) {
    return (node) => {
        return node.decorators.some(it => {
            return isDecorator_1.isDecorator(name)(it);
        });
    };
}
exports.hasClassDecorator = hasClassDecorator;
function hasPropertyDecorator(name) {
    return (node) => {
        if (node && node.decorators && node.decorators.length > 0) {
            return node.decorators.some(it => {
                return isDecorator_1.isDecorator(name)(it);
            });
        }
        else {
            return false;
        }
    };
}
exports.hasPropertyDecorator = hasPropertyDecorator;
function hasParameterDecorator(name) {
    return (node) => {
        if (node && node.decorators && node.decorators.length > 0) {
            return node.decorators.some(it => {
                return isDecorator_1.isDecorator(name)(it);
            });
        }
        else {
            return false;
        }
    };
}
exports.hasParameterDecorator = hasParameterDecorator;
function hasMethodDecorator(name) {
    return (node) => {
        if (node && node.decorators && node.decorators.length > 0) {
            return node.decorators.some(it => {
                return isDecorator_1.isDecorator(name)(it);
            });
        }
        else {
            return false;
        }
    };
}
exports.hasMethodDecorator = hasMethodDecorator;
