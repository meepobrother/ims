import { NodePath, Node } from '@babel/traverse';
import * as t from '@babel/types';
export declare class Ast<T extends Node> {
    path: NodePath<T>;
    constructor(path: NodePath<T>);
    visit(): void;
}
export declare class JSXText extends Ast<t.JSXText> {
    visit(): string;
}
export declare class JsxElement {
    path: NodePath<t.JSXElement>;
    constructor(path: NodePath<t.JSXElement>);
    visit(): {
        tag: {
            name: string;
            attributes: void[];
        };
        children: string[];
    };
}
export declare class JSXClosingElement {
    path: NodePath<t.JSXClosingElement>;
    html: string;
    constructor(path: NodePath<t.JSXClosingElement>);
}
export declare class JSXOpeningElementName extends Ast<t.JSXIdentifier | t.JSXMemberExpression> {
    visit(): string;
}
export declare class JSXOpeningElement {
    path: NodePath<t.JSXOpeningElement>;
    html: string;
    constructor(path: NodePath<t.JSXOpeningElement>);
    visit(): {
        name: string;
        attributes: void[];
    };
}
export declare class ArrayExpression extends Ast<t.ArrayExpression> {
}
export declare class AssignmentExpression extends Ast<t.AssignmentExpression> {
}
export declare class Expression {
    path: NodePath<t.Expression>;
    constructor(path: NodePath<t.Expression>);
}
export declare class JSXSpreadAttribute {
    path: NodePath<t.JSXSpreadAttribute>;
    constructor(path: NodePath<t.JSXSpreadAttribute>);
}
export declare class JSXAttribute extends Ast<t.JSXAttribute> {
}
export declare class JSXIdentifier {
    path: NodePath<t.JSXIdentifier>;
    html: string;
    constructor(path: NodePath<t.JSXIdentifier>);
}
