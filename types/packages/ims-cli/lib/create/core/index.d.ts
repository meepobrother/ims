import ts from "typescript";
export declare abstract class Ast<T extends ts.Node> {
    fileName: string;
    printer: ts.Printer;
    resultFile: ts.SourceFile;
    constructor(fileName?: string);
    abstract create(): T;
    /**
     * 源码
     */
    toSource(): string;
    /**
     * 编译后的代码
     */
    toString(): string;
}
export declare class FunctionAst extends Ast<ts.FunctionDeclaration> {
    decorators: ts.Decorator[];
    modifiers: ts.Modifier[];
    asteriskToken: ts.AsteriskToken;
    name: ts.Identifier;
    typeParameters: ts.TypeParameterDeclaration[];
    parameters: ParameterDeclarationAst[];
    type: ts.TypeNode;
    statements: ts.Statement[];
    constructor(name: string);
    addParameters(parameter: ParameterDeclarationAst): void;
    addTypeParameters(typeParameter: ts.TypeParameterDeclaration): void;
    setType(type: ts.TypeNode): void;
    addStatements(statement: ts.Statement): void;
    setAsteriskToken(asteriskToken: ts.AsteriskToken): void;
    setName(name: string): void;
    addModifier(modifier: ts.Modifier): void;
    addDecorator(decorator: ts.Decorator): void;
    create(): ts.FunctionDeclaration;
    createParameterDeclarationAst(): ParameterDeclarationAst;
}
export declare class ParameterDeclarationAst extends Ast<ts.ParameterDeclaration> {
    decorators: ts.Decorator[];
    modifiers: ts.Modifier[];
    dotDotDotToken: ts.DotDotDotToken;
    name: string | ts.BindingName;
    questionToken: ts.QuestionToken;
    type: ts.TypeNode;
    initializer: ts.Expression;
    setName(name: string | ts.BindingName): void;
    create(): ts.ParameterDeclaration;
}
