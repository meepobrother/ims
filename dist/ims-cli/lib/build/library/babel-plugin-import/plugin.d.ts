import { NodePath } from '@babel/traverse';
export default class Plugin {
    libraryName: string;
    libraryDirectory: string;
    camel2DashComponentName: true | string;
    camel2UnderlineComponentName: string;
    style: any;
    fileName: string;
    customName: any;
    transformToDefaultImport: true | string;
    types: any;
    pluginStateKey: string;
    constructor(libraryName: string, libraryDirectory: string, style: any, camel2DashComponentName: string, camel2UnderlineComponentName: string, fileName: string, customName: any, transformToDefaultImport: string, types: any, index?: number);
    getPluginState(state: {
        [key: string]: any;
    }): any;
    isInGlobalScope(path: NodePath<any>, name: string, pluginState: any): boolean;
    importMethod(methodName: any, file: any, pluginState: any): any;
    buildExpressionHandler(node: any, props: any, path: any, state: any): void;
    buildDeclaratorHandler(node: any, prop: any, path: any, state: any): void;
    ProgramEnter(path: any, state: any): void;
    ProgramExit(path: any, state: any): void;
    ImportDeclaration(path: any, state: any): void;
    CallExpression(path: any, state: any): void;
    MemberExpression(path: any, state: any): void;
    Property(path: any, state: any): void;
    VariableDeclarator(path: any, state: any): void;
    ArrayExpression(path: any, state: any): void;
    LogicalExpression(path: any, state: any): void;
    ConditionalExpression(path: any, state: any): void;
    IfStatement(path: any, state: any): void;
    ExpressionStatement(path: any, state: any): void;
    ReturnStatement(path: any, state: any): void;
    ExportDefaultDeclaration(path: any, state: any): void;
    BinaryExpression(path: any, state: any): void;
    NewExpression(path: any, state: any): void;
}
