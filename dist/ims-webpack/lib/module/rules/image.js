"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageOptions = {
    limit: 10000,
};
exports.default = {
    test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
    loader: 'url-loader',
    options: imageOptions,
};
