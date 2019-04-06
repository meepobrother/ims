"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traverse_1 = require("@babel/traverse");
exports.NodePath = traverse_1.NodePath;
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
function buildPlugin(handler) {
    return helper_plugin_utils_1.declare(handler);
}
exports.buildPlugin = buildPlugin;
