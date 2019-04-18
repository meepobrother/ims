import ts from 'typescript';
export declare function methodToProperty(member: ts.MethodDeclaration): {
    property: ts.PropertyDeclaration;
    imports: any[];
};
