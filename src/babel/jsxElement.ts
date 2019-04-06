import { NodePath, Node } from '@babel/traverse'
import * as t from '@babel/types'

export class Ast<T extends Node>{
    constructor(public path: NodePath<T>) { }
    visit() { }
}
export class JSXText extends Ast<t.JSXText>{
    visit() {
        return this.path.node.value;
    }
}
export class JsxElement {
    constructor(public path: NodePath<t.JSXElement>) {}

    visit() {
        const children = this.path.get('children');
        const openingElement = this.path.get('openingElement')
        const closingElement = this.path.get('closingElement')
        new JSXClosingElement(closingElement);
        return {
            tag: new JSXOpeningElement(openingElement).visit(),
            children: children.map(child => {
                if (child.isJSXText()) {
                    return new JSXText(child).visit()
                }
            })
        }
    }
}

export class JSXClosingElement {
    html: string = '';
    constructor(public path: NodePath<t.JSXClosingElement>) {
        const name = path.get('name');
        if (name.isJSXIdentifier()) {
            this.html += new JSXIdentifier(name).html
        }
        if (name.isJSXMemberExpression()) {

        }
    }
}

export class JSXOpeningElementName extends Ast<t.JSXIdentifier | t.JSXMemberExpression> {
    visit() {
        if (this.path.isJSXIdentifier()) {
            return this.path.node.name;
        }
        if (this.path.isJSXMemberExpression()) { }
    }
}

export class JSXOpeningElement {
    html: string = '';
    constructor(public path: NodePath<t.JSXOpeningElement>) {
        const name = path.get('name');
    }

    visit() {
        const name = this.path.get('name');
        const attributes = this.path.get('attributes')
        return {
            name: new JSXOpeningElementName(name).visit(),
            attributes: attributes.map(attr => {
                if (attr.isJSXAttribute()) {
                    new JSXAttribute(attr)
                }
                if (attr.isJSXSpreadAttribute()) {
                    new JSXSpreadAttribute(attr)
                }
            })
        }
    }
}

export class ArrayExpression extends Ast<t.ArrayExpression> { }
export class AssignmentExpression extends Ast<t.AssignmentExpression> { }

export class Expression {
    constructor(public path: NodePath<t.Expression>) {
        if (path.isArrayExpression()) {
            new ArrayExpression(path)
        }
        if (path.isAssignmentExpression()) {
            new AssignmentExpression(path)
        }
    }
}

export class JSXSpreadAttribute {
    constructor(public path: NodePath<t.JSXSpreadAttribute>) {
        const argument = path.get('argument');
        new Expression(argument)
    }
}

export class JSXAttribute extends Ast<t.JSXAttribute> { }

export class JSXIdentifier {
    html: string;
    constructor(public path: NodePath<t.JSXIdentifier>) {
        this.html = this.path.node.name
    }
}