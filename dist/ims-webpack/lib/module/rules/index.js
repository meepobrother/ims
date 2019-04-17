"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel_1 = __importDefault(require("./babel"));
const tsx_1 = __importDefault(require("./tsx"));
const jsx_1 = __importDefault(require("./jsx"));
const css_1 = __importDefault(require("./css"));
const image_1 = __importDefault(require("./image"));
const less_1 = __importDefault(require("./less"));
const svg_1 = __importDefault(require("./svg"));
const sass_1 = __importDefault(require("./sass"));
class ImsWebpackModule {
    constructor(module) {
        this.module = module;
        this.babelConfig = babel_1.default(module);
    }
    get() {
        return {
            noParse: [/moment.js/],
            rules: [
                tsx_1.default(this.babelConfig),
                jsx_1.default(this.babelConfig),
                css_1.default,
                image_1.default,
                less_1.default,
                svg_1.default,
                sass_1.default
            ]
        };
    }
}
exports.ImsWebpackModule = ImsWebpackModule;
