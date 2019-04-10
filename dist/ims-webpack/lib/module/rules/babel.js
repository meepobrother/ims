"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
function default_1(modules = 'auto') {
    const plugins = [
        util_1.resolve('babel-plugin-inline-import-data-uri'),
        util_1.resolve('@babel/plugin-transform-member-expression-literals'),
        util_1.resolve('@babel/plugin-transform-object-assign'),
        util_1.resolve('@babel/plugin-transform-property-literals'),
        [
            util_1.resolve('@babel/plugin-transform-runtime'),
            {
                helpers: false,
            },
        ],
        util_1.resolve('@babel/plugin-transform-spread'),
        util_1.resolve('@babel/plugin-transform-template-literals'),
        util_1.resolve('@babel/plugin-proposal-export-default-from'),
        util_1.resolve('@babel/plugin-proposal-export-namespace-from'),
        util_1.resolve('@babel/plugin-proposal-object-rest-spread'),
        [
            util_1.resolve('@babel/plugin-proposal-decorators'),
            {
                legacy: true,
            },
        ],
        util_1.resolve('@babel/plugin-proposal-class-properties'),
    ];
    return {
        presets: [
            util_1.resolve('@babel/preset-typescript'),
            util_1.resolve('@babel/preset-react'),
            [
                util_1.resolve('@babel/preset-env'),
                {
                    modules,
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'Firefox ESR',
                            '> 1%',
                            'ie >= 9',
                            'iOS >= 8',
                            'Android >= 4',
                        ],
                    },
                },
            ],
        ],
        plugins,
    };
}
exports.default = default_1;
;
