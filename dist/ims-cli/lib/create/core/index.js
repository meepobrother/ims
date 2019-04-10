"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
class Ast {
    constructor(fileName = '') {
        this.fileName = fileName;
        this.printer = typescript_1.default.createPrinter({
            newLine: typescript_1.default.NewLineKind.LineFeed
        });
        this.resultFile = typescript_1.default.createSourceFile(this.fileName, "", typescript_1.default.ScriptTarget.Latest, 
        /*setParentNodes*/ false, typescript_1.default.ScriptKind.TS);
    }
    /**
     * 源码
     */
    toSource() {
        return this.printer.printNode(typescript_1.default.EmitHint.Unspecified, this.create(), this.resultFile);
    }
    /**
     * 编译后的代码
     */
    toString() {
        const code = this.toSource();
        const res = typescript_1.default.transpileModule(code, {});
        return res.outputText;
    }
}
exports.Ast = Ast;
class FunctionAst extends Ast {
    constructor(name) {
        super(name);
        this.decorators = [];
        this.modifiers = [];
        this.typeParameters = [];
        this.parameters = [];
        this.statements = [];
    }
    addParameters(parameter) {
        this.parameters.push(parameter);
    }
    addTypeParameters(typeParameter) {
        this.typeParameters.push(typeParameter);
    }
    setType(type) {
        this.type = type;
    }
    addStatements(statement) {
        this.statements.push(statement);
    }
    setAsteriskToken(asteriskToken) {
        this.asteriskToken = asteriskToken;
    }
    setName(name) {
        this.name = typescript_1.default.createIdentifier(name);
    }
    addModifier(modifier) {
        this.modifiers.push(modifier);
    }
    addDecorator(decorator) {
        this.decorators.push(decorator);
    }
    create() {
        const body = typescript_1.default.createBlock(this.statements);
        return typescript_1.default.createFunctionDeclaration(this.decorators, this.modifiers, this.asteriskToken, this.name, this.typeParameters, this.parameters.map(parameter => parameter.create()), this.type, body);
    }
    createParameterDeclarationAst() {
        return new ParameterDeclarationAst(this.fileName);
    }
}
exports.FunctionAst = FunctionAst;
class ParameterDeclarationAst extends Ast {
    constructor() {
        super(...arguments);
        this.decorators = [];
        this.modifiers = [];
    }
    setName(name) {
        this.name = name;
    }
    create() {
        return typescript_1.default.createParameter(this.decorators, this.modifiers, this.dotDotDotToken, this.name, this.questionToken, this.type, this.initializer);
    }
}
exports.ParameterDeclarationAst = ParameterDeclarationAst;
const ast = new FunctionAst('');
ast.setName('getItem');
const parameter = ast.createParameterDeclarationAst();
parameter.setName('demo');
ast.addParameters(parameter);
const res = ast.toString();
console.log(res);
