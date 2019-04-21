import ts from 'typescript';
export declare const isControllerDecorator: (node: ts.Decorator) => boolean;
export declare const isAddonDecorator: (node: ts.Decorator) => boolean;
export declare function isDecorator(name: string): (node: ts.Decorator) => boolean;
