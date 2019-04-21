import ts from 'typescript';
export declare function hasClassDecorator(name: string): (node: ts.ClassDeclaration) => boolean;
export declare function hasPropertyDecorator(name: string): (node: ts.PropertyDeclaration) => boolean;
export declare function hasParameterDecorator(name: string): (node: ts.ParameterDeclaration) => boolean;
export declare function hasMethodDecorator(name: string): (node: ts.MethodDeclaration) => boolean;
