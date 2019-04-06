"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
    limit: 10000,
    minetype: 'image/svg+xml',
};
exports.default = {
    test: svgRegex,
    loader: 'url-loader',
    options: svgOptions,
};
