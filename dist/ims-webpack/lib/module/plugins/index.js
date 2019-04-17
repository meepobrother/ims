"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
exports.default = (pkg) => [
    new CaseSensitivePathsPlugin(),
    new webpack.BannerPlugin(`
${pkg.name} v${pkg.version}
Copyright 2019-present, imeepos, Inc.
All rights reserved.
      `),
    new WebpackBar({
        name: '🚚  IMS',
        color: '#2f54eb',
    }),
    new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
];
