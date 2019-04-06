import ts from "typescript";
export abstract class Ast<T extends ts.Node> {
    printer: ts.Printer;
    resultFile: ts.SourceFile;
    constructor(public fileName: string = '') {
        this.printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed
        });
        this.resultFile = ts.createSourceFile(
            this.fileName,
            "",
            ts.ScriptTarget.Latest,
          /*setParentNodes*/ false,
            ts.ScriptKind.TS
        );
    }
    abstract create(): T;
    /**
     * 源码
     */
    toSource(): string {
        return this.printer.printNode(
            ts.EmitHint.Unspecified,
            this.create(),
            this.resultFile
        );
    }
    /**
     * 编译后的代码
     */
    toString(): string {
        const code = this.toSource();
        const res = ts.transpileModule(code, {})
        return res.outputText;
    }
}
export class FunctionAst extends Ast<ts.FunctionDeclaration> {
    decorators: ts.Decorator[] = [];
    modifiers: ts.Modifier[] = [];
    asteriskToken: ts.AsteriskToken;
    name: ts.Identifier;
    typeParameters: ts.TypeParameterDeclaration[] = [];
    parameters: ParameterDeclarationAst[] = [];
    type: ts.TypeNode;
    statements: ts.Statement[] = [];
    constructor(name: string) {
        super(name)
    }
    addParameters(parameter: ParameterDeclarationAst) {
        this.parameters.push(parameter)
    }
    addTypeParameters(typeParameter: ts.TypeParameterDeclaration) {
        this.typeParameters.push(typeParameter);
    }
    setType(type: ts.TypeNode) {
        this.type = type;
    }
    addStatements(statement: ts.Statement) {
        this.statements.push(statement)
    }
    setAsteriskToken(asteriskToken: ts.AsteriskToken) {
        this.asteriskToken = asteriskToken;
    }
    setName(name: string) {
        this.name = ts.createIdentifier(name)
    }
    addModifier(modifier: ts.Modifier) {
        this.modifiers.push(modifier);
    }
    addDecorator(decorator: ts.Decorator) {
        this.decorators.push(decorator);
    }
    create() {
        const body = ts.createBlock(this.statements)
        return ts.createFunctionDeclaration(
            this.decorators,
            this.modifiers,
            this.asteriskToken,
            this.name,
            this.typeParameters,
            this.parameters.map(parameter => parameter.create()),
            this.type,
            body
        )
    }

    createParameterDeclarationAst(): ParameterDeclarationAst {
        return new ParameterDeclarationAst(this.fileName)
    }
}

export class ParameterDeclarationAst extends Ast<ts.ParameterDeclaration>{
    decorators: ts.Decorator[] = [];
    modifiers: ts.Modifier[] = [];
    dotDotDotToken: ts.DotDotDotToken;
    name: string | ts.BindingName;
    questionToken: ts.QuestionToken;
    type: ts.TypeNode;
    initializer: ts.Expression;

    setName(name: string | ts.BindingName) {
        this.name = name;
    }

    create(): ts.ParameterDeclaration {
        return ts.createParameter(
            this.decorators,
            this.modifiers,
            this.dotDotDotToken,
            this.name,
            this.questionToken,
            this.type,
            this.initializer
        )
    }
}

const ast = new FunctionAst('');
ast.setName('getItem');
const parameter = ast.createParameterDeclarationAst();
parameter.setName('demo');
ast.addParameters(parameter);
const res = ast.toString();
console.log(res);
