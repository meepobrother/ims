"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.default = (babelConfig) => {
    return {
        test: /\.tsx?$/,
        use: [
            {
                loader: util_1.resolve('babel-loader'),
                options: babelConfig,
            },
            {
                loader: util_1.resolve('ts-loader'),
                options: {
                    transpileOnly: true,
                },
            },
        ],
    };
};
