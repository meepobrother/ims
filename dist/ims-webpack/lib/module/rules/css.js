"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss_1 = tslib_1.__importDefault(require("./postcss"));
exports.default = {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'postcss-loader',
            options: Object.assign({}, postcss_1.default, { sourceMap: true }),
        },
    ],
};