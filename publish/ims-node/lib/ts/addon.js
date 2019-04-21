"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const typescript_1 = __importDefault(require("typescript"));
const hasDecorator_1 = require("./hasDecorator");
const isDecorator_1 = require("./isDecorator");
function getAddonPath(root) {
    const code = fs_extra_1.default.readFileSync(root).toString('utf8');
    const sourceFile = typescript_1.default.createSourceFile('', code, typescript_1.default.ScriptTarget.Latest, true, typescript_1.default.ScriptKind.Unknown);
    let path = '';
    const visitor = (node) => {
        if (typescript_1.default.isClassDeclaration(node)) {
            if (hasDecorator_1.hasAddonDecorator(node)) {
                const addon = node.decorators.find(de => isDecorator_1.isAddonDecorator(de));
                const { expression } = addon;
                if (typescript_1.default.isCallExpression(expression)) {
                    const _arguments = expression.arguments;
                    _arguments.map(argument => {
                        if (typescript_1.default.isObjectLiteralExpression(argument)) {
                            argument.properties.map(it => {
                                if (typescript_1.default.isPropertyAssignment(it)) {
                                    const name = it.name;
                                    if (typescript_1.default.isIdentifier(name)) {
                                        if (name.text === 'path') {
                                            if (typescript_1.default.isStringLiteral(it.initializer)) {
                                                path = it.initializer.text;
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
        return node;
    };
    sourceFile.forEachChild(visitor, (nodes) => {
        for (let node of nodes) {
            const res = visitor(node);
        }
    });
    return path;
}
exports.getAddonPath = getAddonPath;
