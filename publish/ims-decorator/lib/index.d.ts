import "reflect-metadata";
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare function isType<T>(val: any): val is Type<T>;
export declare function inject(type: any): any;
export declare const getDesignType: (target: any, propertyKey: string | number | symbol) => any;
export declare const getDesignParamTypes: (target: any, propertyKey: string | number | symbol) => any;
export declare const getDesignReturnType: (target: any, propertyKey: string | number | symbol) => any;
export declare enum AstTypes {
    class = 0,
    constructor = 1,
    property = 2,
    parameter = 3,
    method = 4
}
export declare abstract class Ast<T = any> {
    type: AstTypes;
    target: any;
    metadataKey: string;
    metadataDef: T;
    sourceRoot: string;
    constructor(type: AstTypes, target: any, metadataKey: string, metadataDef: T, sourceRoot: string);
    abstract visit(visitor: AstVisitor, context?: any): any;
}
export declare class ClassAst<T = any> extends Ast<T> {
    constructor(target: Type<any>, metadataKey: string, metadataDef: T, sourceRoot: string);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class ClassContext<T> {
    context: ParserAstContext;
    imports: ClassContext<any>[];
    providers: Provider[];
    ast: ClassAst<T & {
        sourceRoot?: string;
        imports?: any[];
        providers?: Provider[];
    }>;
    readonly parent: TypeContext;
    readonly sourceRoot: string;
    readonly target: any;
    getParent(metadataKey: string): ClassContext<any> | boolean;
    constructor(ast: ClassAst, context: ParserAstContext);
    forEachObjectToTypeContent<T extends TypeContext = TypeContext>(obj: any[] | object, defs?: any[]): T[];
    inject<T>(key: any): T;
}
export declare function isClassAst<T>(val: Ast): val is ClassAst<T>;
export declare class PropertyAst<T = any> extends Ast<T> {
    propertyKey: PropertyKey;
    propertyType: any;
    constructor(target: any, metadataKey: string, metadataDef: T, propertyKey: PropertyKey, propertyType: any, sourceRoot: string);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class PropertyContext<T> {
    ast: PropertyAst<T & {
        sourceRoot?: string;
    }>;
    context: ParserAstContext;
    constructor(ast: PropertyAst<T & {
        sourceRoot?: string;
    }>, context: ParserAstContext);
}
export declare function isPropertyAst<T>(val: Ast): val is PropertyAst<T>;
export declare class MethodAst<T = any> extends Ast<T> {
    propertyKey: PropertyKey;
    returnType: any;
    parameterTypes: any[];
    parameterLength: number;
    descriptor: any;
    parameters: ParameterAst[];
    constructor(target: any, metadataKey: string, metadataDef: T, propertyKey: PropertyKey, returnType: any, parameterTypes: any[], parameterLength: number, descriptor: any, sourceRoot: string);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class MethodContext<T> {
    ast: MethodAst<T & {
        sourceRoot?: string;
    }>;
    context: ParserAstContext;
    parameters: ParameterContext<any>[];
    constructor(ast: MethodAst<T & {
        sourceRoot?: string;
    }>, context: ParserAstContext);
}
export declare function isMethodAst<T>(val: Ast): val is MethodAst<T>;
export declare class ParameterAst<T = any> extends Ast<T> {
    propertyKey: PropertyKey;
    parameterType: any;
    parameterIndex: number;
    constructor(target: any, metadataKey: string, metadataDef: T, propertyKey: PropertyKey, parameterType: any, parameterIndex: number, sourceRoot: string);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class ParameterContext<T> {
    ast: ParameterAst<T & {
        sourceRoot?: string;
    }>;
    context: ParserAstContext;
    constructor(ast: ParameterAst<T & {
        sourceRoot?: string;
    }>, context: ParserAstContext);
}
export declare function isParameterAst<T>(val: Ast): val is ParameterAst<T>;
export declare class ConstructorAst<T = any> extends Ast<T> {
    parameterType: any;
    parameterIndex: number;
    constructor(target: any, metadataKey: string, metadataDef: T, parameterType: any, parameterIndex: number, sourceRoot: string);
    visit(visitor: AstVisitor, context?: any): any;
}
export declare class ConstructorContext<T> {
    ast: ConstructorAst<T & {
        sourceRoot: string;
    }>;
    constructor(ast: ConstructorAst<T & {
        sourceRoot: string;
    }>, context: ParserAstContext);
}
export declare function isConstructorAst<T>(val: Ast): val is ConstructorAst<T>;
export interface AstVisitor {
    visit(ast: Ast, context: ParserAstContext): any;
    visitType(type: any): TypeContext;
    visitClass(ast: ClassAst, context: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
}
export declare class TypeContext {
    type: any;
    visitor: AstVisitor;
    parent: TypeContext;
    children: TypeContext[];
    classes: ClassContext<any>[];
    propertys: PropertyContext<any>[];
    methods: MethodContext<any>[];
    constructors: ConstructorContext<any>[];
    target: any;
    providers: Provider[];
    instance: any;
    global: Map<string, any>;
    setParent(parent: TypeContext): void;
    get<T = any>(key: any): T;
    set(key: any, val: any): void;
    constructor(type: any, visitor: AstVisitor);
    inject(type: any): any;
    getClass<T extends ClassContext<any> = ClassContext<any>>(metadataKey: string): T;
    getProperty(metadataKey?: string): PropertyContext<any>[];
    getMethod(metadataKey?: string): MethodContext<any>[];
    getController(metadataKey?: string): ConstructorContext<any>[];
}
export declare class NullAstVisitor implements AstVisitor {
    visit(ast: Ast, context?: ParserAstContext): any;
    visitType(type: any): TypeContext;
    visitClass(ast: ClassAst, context?: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
}
export declare class Visitors extends NullAstVisitor {
    visitors: AstVisitor[];
    addons: TypeContext[];
    constructor(visitors: AstVisitor[]);
    visitClass(ast: ClassAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitMap(ast: Ast, context: ParserAstContext): any;
}
/** 获取ParserAstContext */
export declare const imsContext: unique symbol;
export declare function getContext(target: any): ParserAstContext;
export declare class ParserAstContext {
    private _stats;
    prevAst: Ast;
    constructors: ConstructorAst[];
    classes: ClassAst[];
    propertys: PropertyAst[];
    methods: MethodAst[];
    parameters: ParameterAst[];
    parametersMap: Map<PropertyKey, ParameterAst[]>;
    instance: any;
    visitor: AstVisitor;
    typeContext: TypeContext;
    global: any;
    visit(ast: Ast): any;
    visitType<T extends TypeContext = TypeContext>(type: any): T;
    inject(type: any): any;
    visitClass(metadataKey?: string): ClassContext<any>[];
    visitProperty(metadataKey?: string): PropertyContext<any>[];
    visitMethod(metadataKey?: string): MethodContext<any>[];
    visitController(metadataKey?: string): ConstructorContext<any>[];
    getClassAst(metadataKey?: string): ClassAst[];
    getProperty(metadataKey?: string): PropertyAst[];
    getMethod(metadataKey?: string): MethodAst[];
    getConstructor(metadataKey?: string): ConstructorAst[];
    stats: AstTypes;
}
export declare class ParserVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): void;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): void;
    visitProperty(ast: PropertyAst, context: ParserAstContext): void;
    visitMethod(ast: MethodAst, context: ParserAstContext): void;
    visitParameter(ast: ParameterAst, context: ParserAstContext): void;
}
export declare class ParserManager {
    visitor: AstVisitor;
    _map: Map<any, ParserAstContext>;
    getContext(target: any): any;
}
export interface DefaultOptions<T> {
    type: 'parameter' | 'property' | 'method' | 'constructor' | 'class';
    metadataDef: T;
    metadataKey: string;
    target: any;
    propertyKey?: PropertyKey;
    propertyType?: any;
    descriptor?: TypedPropertyDescriptor<any>;
    parameterIndex?: number;
    parameterType?: any;
    paramTypes?: any[];
    returnType?: any;
}
export declare function makeDecorator2<T extends Array<any>, O>(metadataKey: string, pro: (...args: T) => O): (...params: T) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function makeDecorator<T>(metadataKey: string, getDefault?: (opt: DefaultOptions<T>) => T): (metadataDef?: T & {
    sourceRoot?: string;
    imports?: any[];
    providers?: Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export interface Abstract<T> extends Function {
    prototype: T;
}
export declare type Provider<T = any> = Type<any> | ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>;
export declare type ProvideKey = string | symbol | Type<any> | Abstract<any>;
export interface ClassProvider<T = any> {
    provide: ProvideKey;
    useClass: Type<T>;
}
export declare function isClassProvider<T>(val: any): val is ClassProvider<T>;
export interface ValueProvider<T = any> {
    provide: ProvideKey;
    useValue: T;
}
export declare function isValueProvider<T>(val: any): val is ValueProvider<T>;
export interface FactoryProvider<T = any> {
    provide: ProvideKey;
    useFactory: (...args: any[]) => T;
    deps?: any[];
}
export declare function isFactoryProvider<T>(val: any): val is FactoryProvider<T>;
