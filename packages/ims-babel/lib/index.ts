import * as ts from 'typescript';
import { } from '@babel/traverse'
export function traverse(node: ts.Node) {
    return node.forEachChild<NodePath>((node: ts.Node) => {
        return new NodePath(node)
    }, (nodes: ts.NodeArray<ts.Node>) => {
        return new NodePath(nodes)
    });
}

class NodePath<T extends ts.Node = ts.Node>{
    parentPath: NodePath;
    child: NodePath;
    children: NodePath[];
    parent: ts.Node;
    node: ts.Node;
    constructor(node: T | ts.NodeArray<T>) {
        if (this.isNodeArray(node)) {
            this.children = node.map(n => new NodePath(n))
        } else {
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
    isNodeArray(node: any): node is ts.NodeArray<T> {
        return Array.isArray(node)
    }
    traverse(visitor: any) {

    }
    isVariableDeclaration(): this is NodePath<ts.VariableDeclaration> {
        return ts.isVariableDeclaration(this.node)
    }
    isAccessor(): this is NodePath<ts.AccessorDeclaration> {
        return ts.isAccessor(this.node)
    }
    isArrayBindingPattern(): this is NodePath<ts.ArrayBindingPattern> {
        return ts.isArrayBindingPattern(this.node)
    }
    isArrayLiteralExpression(): this is NodePath<ts.ArrayLiteralExpression> {
        return ts.isArrayLiteralExpression(this.node)
    }
    isArrayTypeNode(): this is NodePath<ts.ArrayTypeNode> {
        return ts.isArrayTypeNode(this.node)
    }
    isArrowFunction(): this is NodePath<ts.ArrowFunction> {
        return ts.isArrowFunction(this.node)
    }
    isAsExpression(): this is NodePath<ts.AsExpression> {
        return ts.isAsExpression(this.node)
    }
    isAwaitExpression(): this is NodePath<ts.AwaitExpression> {
        return ts.isAwaitExpression(this.node)
    }
    isAssertionExpression(): this is NodePath<ts.AssertionExpression> {
        return ts.isAssertionExpression(this.node)
    }
    isBigIntLiteral(): this is NodePath<ts.BigIntLiteral> {
        return ts.isBigIntLiteral(this.node)
    }
    isBinaryExpression(): this is NodePath<ts.BinaryExpression> {
        return ts.isBinaryExpression(this.node)
    }
    isBindingElement(): this is NodePath<ts.BindingElement> {
        return ts.isBindingElement(this.node)
    }
    isBindingName(): this is NodePath<ts.BindingName> {
        return ts.isBindingName(this.node)
    }
    isBlock(): this is NodePath<ts.Block> {
        return ts.isBlock(this.node)
    }
    isBreakOrContinueStatement(): this is NodePath<ts.BreakOrContinueStatement> {
        return ts.isBreakOrContinueStatement(this.node)
    }
    isBreakStatement(): this is NodePath<ts.BreakStatement> {
        return ts.isBreakStatement(this.node)
    }
    isBundle(): this is NodePath<ts.Bundle> {
        return ts.isBundle(this.node)
    }
}
// const sourceFile = ts.createSourceFile('1.ts', `const item:number = 1`, ts.ScriptTarget.ESNext, true, ts.ScriptKind.Unknown);
// const nodePath = traverse(sourceFile);
// if (nodePath.isAccessor()) {
//     nodePath.node.parent
// }