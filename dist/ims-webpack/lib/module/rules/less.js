"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const util_1 = require("./util");
const postcss_1 = __importDefault(require("./postcss"));
exports.default = {
    test: /\.less$/,
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
        {
            loader: util_1.resolve('less-loader'),
            options: {
                javascriptEnabled: true,
                sourceMap: true,
            },
        },
    ],
};
