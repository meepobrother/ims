"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
function template(code) {
    return (props, fileName = '', languageVersion = ts.ScriptTarget.ESNext, setParentNodes, scriptKind) => {
        const sourceFile = ts.createSourceFile(fileName, code, languageVersion, setParentNodes, scriptKind);
        const visitChild = (node) => {
            if (ts.isIdentifier(node)) {
                let val = node.text;
                if (props[node.text])
                    val = props[node.text];
                return ts.createIdentifier(val);
            }
            else if (ts.isVariableStatement(node)) {
                let modifiers = [];
                if (node.modifiers) {
                    modifiers = node.modifiers.map(modifier => modifier.forEachChild(visitChild, visitChildren));
                }
                const declarationList = node.declarationList.forEachChild(visitChild, visitChildren);
                return ts.createVariableStatement(modifiers, declarationList);
            }
            else if (ts.isVariableDeclarationList(node)) {
                return ts.createVariableDeclarationList(node.declarations);
            }
            else if (ts.isVariableDeclaration(node)) {
                let name = node.name;
                if (ts.isBindingName(name)) {
                    name = name.forEachChild(visitChild, visitChildren);
                }
                const type = node.type && node.type.forEachChild(visitChild, visitChildren);
                const initializer = node.initializer && node.initializer.forEachChild(visitChild, visitChildren);
                return ts.createVariableDeclaration(name, type, initializer);
            }
            else {
                return node;
            }
        };
        const visitChildren = (nodes) => {
            return ts.createNodeArray(nodes.map(node => visitChild(node)));
        };
        const ast = sourceFile.forEachChild(visitChild, visitChildren);
        const printer = ts.createPrinter();
        const str = printer.printList(ts.ListFormat.None, ast, sourceFile);
        debugger;
    };
}
exports.template = template;
template(`
const React = require('react')
`)({
    react: 'ims-core'
});
