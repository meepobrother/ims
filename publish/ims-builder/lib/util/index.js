"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
__export(require("./isDecorator"));
__export(require("./hasDecorator"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function createSourceFile(path) {
    let code = path;
    if (fs_extra_1.default.existsSync(path)) {
        code = fs_extra_1.default.readFileSync(path).toString('utf8');
    }
    let kind = typescript_1.default.ScriptKind.Unknown;
    if (path.endsWith('.tsx')) {
        kind = typescript_1.default.ScriptKind.TSX;
    }
    else if (path.endsWith('.jsx')) {
        kind = typescript_1.default.ScriptKind.JSX;
    }
    else if (path.endsWith('.json')) {
        kind = typescript_1.default.ScriptKind.JSON;
    }
    else if (path.endsWith('.js')) {
        kind = typescript_1.default.ScriptKind.JS;
    }
    else if (path.endsWith('.ts')) {
        kind = typescript_1.default.ScriptKind.TS;
    }
    return typescript_1.default.createSourceFile(path, code, typescript_1.default.ScriptTarget.Latest, true, kind);
}
exports.createSourceFile = createSourceFile;
function getChildNode(node, filter) {
    const visitor = (node) => {
        if (filter(node))
            return node;
        return node.forEachChild(visitor, visitors);
    };
    const visitors = (nodes) => {
        for (let node of nodes) {
            const res = visitor(node);
            if (!!res)
                return res;
        }
    };
    return node.forEachChild(visitor, visitors);
}
exports.getChildNode = getChildNode;
function createVisitorFromPath(filePath) {
    return (visitor) => {
        const sourceFile = createSourceFile(filePath);
        const node = sourceFile.forEachChild(visitor, (nodes) => {
            for (let node of nodes) {
                const res = visitor(node);
                if (res)
                    return res;
            }
        });
        return {
            ast: node,
            code: printList(typescript_1.default.createNodeArray([node]))
        };
    };
}
exports.createVisitorFromPath = createVisitorFromPath;
function printList(node) {
    const sourceFile = createSourceFile(``);
    const printer = typescript_1.default.createPrinter();
    return printer.printList(typescript_1.default.ListFormat.AllowTrailingComma, node, sourceFile);
}
exports.printList = printList;
function printNode(node) {
    return printList(typescript_1.default.createNodeArray([node]));
}
exports.printNode = printNode;
function createNodeArray(nodes) {
    const members = [];
    nodes.map(node => {
        // 去掉无用的node
        if (!!node)
            members.push(node);
    });
    return typescript_1.default.createNodeArray(members);
}
exports.createNodeArray = createNodeArray;
