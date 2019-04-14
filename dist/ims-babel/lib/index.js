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
function traverse(node) {
    return node.forEachChild((node) => {
        return new NodePath(node);
    }, (nodes) => {
        return new NodePath(nodes);
    });
}
exports.traverse = traverse;
class NodePath {
    constructor(node) {
        if (this.isNodeArray(node)) {
            this.children = node.map(n => new NodePath(n));
        }
        else {
            this.node = node;
            this.parent = node.parent;
            this.child = traverse(node);
            if (this.isVariableDeclaration()) {
                debugger;
            }
            if (this.child) {
                this.child.parentPath = this;
            }
        }
    }
    isNodeArray(node) {
        return Array.isArray(node);
    }
    traverse(visitor) {
    }
    isVariableDeclaration() {
        return ts.isVariableDeclaration(this.node);
    }
    isAccessor() {
        return ts.isAccessor(this.node);
    }
    isArrayBindingPattern() {
        return ts.isArrayBindingPattern(this.node);
    }
    isArrayLiteralExpression() {
        return ts.isArrayLiteralExpression(this.node);
    }
    isArrayTypeNode() {
        return ts.isArrayTypeNode(this.node);
    }
    isArrowFunction() {
        return ts.isArrowFunction(this.node);
    }
    isAsExpression() {
        return ts.isAsExpression(this.node);
    }
    isAwaitExpression() {
        return ts.isAwaitExpression(this.node);
    }
    isAssertionExpression() {
        return ts.isAssertionExpression(this.node);
    }
    isBigIntLiteral() {
        return ts.isBigIntLiteral(this.node);
    }
    isBinaryExpression() {
        return ts.isBinaryExpression(this.node);
    }
    isBindingElement() {
        return ts.isBindingElement(this.node);
    }
    isBindingName() {
        return ts.isBindingName(this.node);
    }
    isBlock() {
        return ts.isBlock(this.node);
    }
    isBreakOrContinueStatement() {
        return ts.isBreakOrContinueStatement(this.node);
    }
    isBreakStatement() {
        return ts.isBreakStatement(this.node);
    }
    isBundle() {
        return ts.isBundle(this.node);
    }
}
// const sourceFile = ts.createSourceFile('1.ts', `const item:number = 1`, ts.ScriptTarget.ESNext, true, ts.ScriptKind.Unknown);
// const nodePath = traverse(sourceFile);
// if (nodePath.isAccessor()) {
//     nodePath.node.parent
// }
