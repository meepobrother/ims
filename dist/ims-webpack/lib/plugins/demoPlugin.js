"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const handler = (api, options) => {
    api.assertVersion(7);
    return {
        name: 'demo-plugin',
        visitor: {}
    };
};
exports.default = type_1.buildPlugin(handler);
