"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
exports.default = {
    plugins: [
        rucksack(),
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
        }),
    ],
};
