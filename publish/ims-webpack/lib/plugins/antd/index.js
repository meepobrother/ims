"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const plugin_1 = __importDefault(require("./plugin"));
function default_1({ types }) {
    let plugins = null;
    // Only for test
    global.__clearBabelAntdPlugin = () => {
        plugins = null;
    };
    function applyInstance(method, args, context) {
        for (const plugin of plugins) {
            if (plugin[method]) {
                plugin[method].apply(plugin, [...args, context]);
            }
        }
    }
    const Program = {
        enter(path, options) {
            // Init plugin instances once.
            let { opts } = options;
            opts = opts || {};
            if (!plugins) {
                if (Array.isArray(opts)) {
                    plugins = opts.map(({ libraryName, libraryDirectory, style, camel2DashComponentName, camel2UnderlineComponentName, fileName, customName, transformToDefaultImport, }, index) => {
                        assert(libraryName, 'libraryName should be provided');
                        return new plugin_1.default(libraryName, libraryDirectory, style, camel2DashComponentName, camel2UnderlineComponentName, fileName, customName, transformToDefaultImport, types, index);
                    });
                }
                else {
                    assert(opts.libraryName, 'libraryName should be provided');
                    plugins = [
                        new plugin_1.default(opts.libraryName, opts.libraryDirectory, opts.style, opts.camel2DashComponentName, opts.camel2UnderlineComponentName, opts.fileName, opts.customName, opts.transformToDefaultImport, types),
                    ];
                }
            }
            applyInstance('ProgramEnter', arguments, this); // eslint-disable-line
        },
        exit() {
            applyInstance('ProgramExit', arguments, this); // eslint-disable-line
        },
    };
    const methods = [
        'ImportDeclaration',
        'CallExpression',
        'MemberExpression',
        'Property',
        'VariableDeclarator',
        'ArrayExpression',
        'LogicalExpression',
        'ConditionalExpression',
        'IfStatement',
        'ExpressionStatement',
        'ReturnStatement',
        'ExportDefaultDeclaration',
        'BinaryExpression',
        'NewExpression',
    ];
    const ret = {
        visitor: { Program },
    };
    for (const method of methods) {
        ret.visitor[method] = function () {
            applyInstance(method, arguments, ret.visitor); // eslint-disable-line
        };
    }
    return ret;
}
exports.default = default_1;
