import ts from 'typescript';
export declare const isControllerDecorator: (node: ts.Node) => boolean;
export declare function isDecorator(name: string): (node: ts.Node) => boolean;
