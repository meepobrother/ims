"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.default = (babelConfig) => {
    return {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: util_1.resolve('babel-loader'),
        options: babelConfig,
    };
};
