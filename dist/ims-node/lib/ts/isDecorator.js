"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
exports.isControllerDecorator = isDecorator('Controller');
function isDecorator(name) {
    return (node) => {
        if (typescript_1.default.isDecorator(node)) {
            const expression = node.expression;
            if (typescript_1.default.isCallExpression(expression)) {
                const express = expression.expression;
                if (typescript_1.default.isIdentifier(express)) {
                    const { text } = express;
                    if (text === name) {
                        return true;
                    }
                }
            }
        }
    };
}
exports.isDecorator = isDecorator;
