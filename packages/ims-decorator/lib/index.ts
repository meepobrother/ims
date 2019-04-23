export interface Type<T> extends Function {
    new(...args: any[]): T;
}
export function isType<T>(val: any): val is Type<T> {
    return typeof val === 'function'
}
export const getDesignType = (target: any, propertyKey: PropertyKey) => Reflect.getMetadata('design:type', target, propertyKey as any);
export const getDesignParamTypes = (target: any, propertyKey: PropertyKey) => Reflect.getMetadata('design:paramtypes', target, propertyKey as any);
export const getDesignReturnType = (target: any, propertyKey: PropertyKey) => Reflect.getMetadata('design:returntype', target, propertyKey as any);
export enum AstTypes {
    class,
    constructor,
    property,
    parameter,
    method
}
export abstract class Ast<T = any> {
    constructor(
        public type: AstTypes,
        public target: any,
        public metadataKey: string,
        public metadataDef: T,
        public sourceRoot: string
    ) { }
    abstract visit(visitor: AstVisitor, context?: any): any;
}

export class ClassAst<T = any> extends Ast<T> {
    constructor(
        target: Type<any>,
        metadataKey: string,
        metadataDef: T,
        sourceRoot: string
    ) {
        super(AstTypes.class, target, metadataKey, metadataDef, sourceRoot);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitClass(this, context);
    }
}
export class ClassContext<T> {
    ast: ClassAst<T>;
    get parent(): TypeContext {
        return this.context.typeContext.parent
    }
    get sourceRoot(): string {
        return this.ast.sourceRoot;
    }
    get target() {
        return this.ast.target;
    }
    getParent(metadataKey: string): ClassContext<any> {
        if (this.parent) {
            return this.parent.getClass(metadataKey)
        }
    }
    constructor(ast: ClassAst, public context: ParserAstContext) {
        this.ast = ast;
    }
    forEachObjectToTypeContent<T extends TypeContext = TypeContext>(obj: any[] | object, defs: any[] = []): T[] {
        if (obj) return Object.keys(obj).map(key => this.context.visitType<T>(obj[key]));
        return defs;
    }
}
export function isClassAst<T>(val: Ast): val is ClassAst<T> {
    return val.type === AstTypes.class;
}
export class PropertyAst<T = any> extends Ast<T> {
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public propertyKey: PropertyKey,
        public propertyType: any,
        sourceRoot: string
    ) {
        super(AstTypes.property, target, metadataKey, metadataDef, sourceRoot);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitProperty(this, context);
    }
}
export class PropertyContext<T>{
    constructor(public ast: PropertyAst<T>, public context: ParserAstContext) { }
}
export function isPropertyAst<T>(val: Ast): val is PropertyAst<T> {
    return val.type === AstTypes.property;
}
export class MethodAst<T = any> extends Ast<T> {
    parameters: ParameterAst[] = [];
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public propertyKey: PropertyKey,
        public returnType: any,
        public parameterTypes: any[],
        public parameterLength: number,
        public descriptor: any,
        sourceRoot: string
    ) {
        super(AstTypes.method, target, metadataKey, metadataDef, sourceRoot);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitMethod(this, context);
    }
}
export class MethodContext<T> {
    parameters: ParameterContext<any>[] = [];
    constructor(public ast: MethodAst<T>, public context: ParserAstContext) {
        if (ast.parameters) this.parameters = ast.parameters.map(par => context.visit(par))
    }
}
export function isMethodAst<T>(val: Ast): val is MethodAst<T> {
    return val.type === AstTypes.method;
}
export class ParameterAst<T = any> extends Ast<T> {
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public propertyKey: PropertyKey,
        public parameterType: any,
        public parameterIndex: number,
        sourceRoot: string
    ) {
        super(AstTypes.parameter, target, metadataKey, metadataDef, sourceRoot);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitParameter(this, context)
    }
}
export class ParameterContext<T> {
    constructor(public ast: ParameterAst<T>, public context: ParserAstContext) { }
}
export function isParameterAst<T>(val: Ast): val is ParameterAst<T> {
    return val.type === AstTypes.parameter;
}
export class ConstructorAst<T = any> extends Ast<T> {
    constructor(
        target: any,
        metadataKey: string,
        metadataDef: T,
        public parameterType: any,
        public parameterIndex: number,
        sourceRoot: string
    ) {
        super(AstTypes.constructor, target, metadataKey, metadataDef, sourceRoot);
    }
    visit(visitor: AstVisitor, context?: any): any {
        return visitor.visitConstructor(this, context);
    }
}
export class ConstructorContext<T> {
    constructor(public ast: ConstructorAst<T>, public context: ParserAstContext) { }
}
export function isConstructorAst<T>(val: Ast): val is ConstructorAst<T> {
    return val.type === AstTypes.constructor;
}
export interface AstVisitor {
    visit(ast: Ast, context: ParserAstContext): any;
    visitType(type: any): TypeContext;
    visitClass(ast: ClassAst, context: ParserAstContext): any;
    visitMethod(ast: MethodAst, context: ParserAstContext): any;
    visitProperty(ast: PropertyAst, context: ParserAstContext): any;
    visitParameter(ast: ParameterAst, context: ParserAstContext): any;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any;
}

export class TypeContext {
    parent: TypeContext;
    children: TypeContext[] = [];

    classes: ClassContext<any>[] = [];
    propertys: PropertyContext<any>[] = [];
    methods: MethodContext<any>[] = [];
    constructors: ConstructorContext<any>[] = [];
    /** 目标 */
    target: any;
    /** 实例 */
    instance: any;
    global: Map<string, any> = new Map();

    setParent(parent: TypeContext) {
        this.parent = parent;
        parent.children.push(this);
    }

    get<T = any>(key: any): T {
        if (this.global.has(key)) return this.global.get(key);
        if (this.parent) return this.parent.get(key)
    }

    set(key: any, val: any) {
        this.global.set(key, val);
    }

    constructor(public type: any, public visitor: AstVisitor) {
        const context = getContext(type);
        if (context) {
            this.target = type;
            context.typeContext = this;
            context.visitor = visitor;
            this.classes = context.visitClass();
            this.propertys = context.visitProperty();
            this.methods = context.visitMethod();
            this.constructors = context.visitController();
            this.instance = new type();
        } else {
            throw new Error(`${type.name} get context error`)
        }
    }

    inject(type: any) {
        return this.get(type)
    }

    getClass<T extends ClassContext<any> = ClassContext<any>>(metadataKey: string): T {
        try {
            const item = this.classes.find(cls => cls.ast.metadataKey === metadataKey) as T;
            if (item) return item;
            return this.parent && this.parent.getClass<T>(metadataKey)
        } catch (e) {
            // console.log(`pless ims-common to handler :${metadataKey}`);
        }
    }

    getProperty(metadataKey?: string): PropertyContext<any>[] {
        if (metadataKey) {
            return this.propertys.filter(cls => cls.ast.metadataKey === metadataKey)
        }
        return this.propertys;
    }

    getMethod(metadataKey?: string): MethodContext<any>[] {
        if (metadataKey) {
            return this.methods.filter(cls => cls.ast.metadataKey === metadataKey)
        }
        return this.methods;
    }

    getController(metadataKey?: string): ConstructorContext<any>[] {
        if (metadataKey) {
            return this.constructors.filter(cls => cls.ast.metadataKey === metadataKey)
        }
        return this.constructors;
    }
}

export class NullAstVisitor implements AstVisitor {
    visit(ast: Ast, context?: ParserAstContext) {
        return ast.visit(this, context);
    }
    visitType(type: any): TypeContext {
        const context = getContext(type);
        if (context) {
            return new TypeContext(type, this);
        } else {
            // throw new Error(`visitType:${type.name} get context error`)
        }
    }
    visitClass(ast: ClassAst, context?: ParserAstContext): any { }
    visitMethod(ast: MethodAst, context: ParserAstContext): any { }
    visitProperty(ast: PropertyAst, context: ParserAstContext): any { }
    visitParameter(ast: ParameterAst, context: ParserAstContext): any { }
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): any { }
}
export class Visitors extends NullAstVisitor {
    addons: TypeContext[] = [];
    constructor(public visitors: AstVisitor[]) {
        super();
    }
    visitClass(ast: ClassAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitConstructor(ast: ConstructorAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        const res = this.visitMap(ast, context);
        if (res) return res;
    }
    visitMap(ast: Ast, context: ParserAstContext) {
        context.visitor = this;
        for (let visitor of this.visitors) {
            const res = ast.visit(visitor, context);
            if (res) return res;
        }
    }
}

/** 获取ParserAstContext */
export const imsContext = Symbol.for('imsContext');
export function getContext(target: any): ParserAstContext {
    if (target) {
        return Reflect.get(target, imsContext);
    }
}

export class ParserAstContext {
    private _stats: AstTypes;
    prevAst: Ast;

    constructors: ConstructorAst[] = [];
    classes: ClassAst[] = [];
    propertys: PropertyAst[] = [];
    methods: MethodAst[] = [];
    parameters: ParameterAst[] = [];
    parametersMap: Map<PropertyKey, ParameterAst[]> = new Map();

    instance: any;

    visitor: AstVisitor;
    typeContext: TypeContext;
    global: any = {};

    visit(ast: Ast) {
        return ast.visit(this.visitor, this)
    }

    visitType<T extends TypeContext = TypeContext>(type: any): T {
        const typeContext = this.visitor.visitType(type);
        typeContext.setParent(this.typeContext);
        this.typeContext.set(type, typeContext.instance)
        return typeContext as T;
    }

    inject(type: any) {
        return this.typeContext.get(type)
    }

    visitClass(metadataKey?: string): ClassContext<any>[] {
        if (metadataKey) return this.getClassAst(metadataKey).map(cls => this.visit(cls));
        return this.classes.map(cls => {
            return this.visit(cls);
        });
    }

    visitProperty(metadataKey?: string): PropertyContext<any>[] {
        if (metadataKey) return this.getProperty(metadataKey).map(cls => this.visit(cls));
        return this.propertys.map(cls => this.visit(cls))
    }

    visitMethod(metadataKey?: string): MethodContext<any>[] {
        if (metadataKey) return this.getMethod(metadataKey).map(cls => this.visit(cls));
        return this.methods.map(cls => this.visit(cls))
    }

    visitController(metadataKey?: string): ConstructorContext<any>[] {
        if (metadataKey) return this.getConstructor(metadataKey).map(cls => this.visit(cls));
        return this.constructors.map(cls => this.visit(cls))
    }

    getClassAst(metadataKey?: string): ClassAst[] {
        if (metadataKey) {
            return this.classes.filter(cls => cls.metadataKey === metadataKey);
        } else {
            return this.classes;
        }
    }

    getProperty(metadataKey?: string): PropertyAst[] {
        if (metadataKey) {
            return this.propertys.filter(pro => pro.metadataKey === metadataKey)
        } else {
            return this.propertys;
        }
    }

    getMethod(metadataKey?: string): MethodAst[] {
        if (metadataKey) {
            return this.methods.filter(pro => pro.metadataKey === metadataKey);
        } else {
            return this.methods;
        }
    }

    getConstructor(metadataKey?: string): ConstructorAst[] {
        if (metadataKey && this.constructors) {
            return this.constructors.filter(pro => pro.metadataKey === metadataKey)
        } else {
            return this.constructors;
        }
    }

    get stats(): AstTypes {
        return this._stats
    }
    set stats(val: AstTypes) {
        if (this.stats === AstTypes.parameter && val !== AstTypes.parameter) {
            // 离开保存数据
            const ast = this.prevAst;
            if (isParameterAst(ast)) {
                this.parametersMap.set(ast.propertyKey, this.parameters)
            }
            this.parameters = [];
        }
        this._stats = val;
    }
}

export class ParserVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        context.stats = AstTypes.class;
        context.prevAst = ast;
        context.classes.push(ast);
        ast.target[imsContext] = context;
    }
    visitConstructor(ast: ConstructorAst, context: ParserAstContext) {
        context.stats = AstTypes.constructor;
        context.prevAst = ast;
        context.constructors.push(ast);
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        context.stats = AstTypes.property;
        context.prevAst = ast;
        context.propertys.push(ast);
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        context.stats = AstTypes.method;
        context.prevAst = ast;
        ast.parameters = context.parametersMap.get(ast.propertyKey);
        context.methods.push(ast);
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        context.stats = AstTypes.parameter;
        context.prevAst = ast;
        context.parameters.push(ast);
    }
}


export class ParserManager {
    visitor: AstVisitor = new ParserVisitor();
    _map: Map<any, ParserAstContext> = new Map();
    getContext(target: any) {
        if (this._map.has(target)) return this._map.get(target);
        this._map.set(target, new ParserAstContext());
        return this.getContext(target);
    }
}

const parserManager = new ParserManager();

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
export function makeDecorator2<T extends Array<any>, O>(metadataKey: string, pro: (...args: T) => O) {
    return (...params: T) => {
        const opt = pro(...params);
        return makeDecorator<O>(metadataKey)(opt)
    }
}
export function makeDecorator<T>(metadataKey: string, getDefault: (opt: DefaultOptions<T>) => T = opt => opt.metadataDef || {} as T) {
    const visitor = parserManager.visitor;
    return (metadataDef?: T & { sourceRoot?: string, imports?: any[], providers?: Provider[] }) => (target: any, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<any> | number) => {
        const sourceRoot = metadataDef && metadataDef.sourceRoot;
        if (propertyKey) {
            if (typeof descriptor === 'number') {
                const context = parserManager.getContext(target.constructor);
                const types = getDesignParamTypes(target, propertyKey)
                metadataDef = getDefault({
                    type: 'parameter',
                    metadataDef,
                    metadataKey,
                    target,
                    propertyKey,
                    parameterIndex: descriptor,
                    parameterType: types[descriptor]
                });
                // parameter
                const ast = new ParameterAst(target, metadataKey, metadataDef, propertyKey, types[descriptor], descriptor, sourceRoot);
                visitor.visitParameter(ast, context)
            } else if (typeof descriptor === 'undefined') {
                // property
                const context = parserManager.getContext(target.constructor);
                const propertyType = getDesignType(target, propertyKey)
                metadataDef = getDefault({
                    type: 'property',
                    metadataDef,
                    metadataKey,
                    target,
                    propertyKey,
                    propertyType
                });
                const ast = new PropertyAst(target, metadataKey, metadataDef, propertyKey, propertyType, sourceRoot);
                visitor.visitProperty(ast, context)
            } else {
                // method
                try {
                    const returnType = getDesignReturnType(target, propertyKey)
                    const paramTypes = getDesignParamTypes(target, propertyKey);
                    const context = parserManager.getContext(target.constructor);
                    metadataDef = getDefault({
                        type: 'method',
                        metadataDef,
                        metadataKey,
                        target,
                        propertyKey,
                        paramTypes,
                        returnType
                    });
                    const ast = new MethodAst(target, metadataKey, metadataDef, propertyKey, returnType, paramTypes, target[propertyKey].length, descriptor, sourceRoot);
                    visitor.visitMethod(ast, context);
                } catch (e) { }
            }
        } else {
            if (typeof descriptor === 'number') {
                // constructor
                const context = parserManager.getContext(target);
                const types = getDesignParamTypes(target, 'constructor')
                metadataDef = getDefault({
                    type: 'constructor',
                    metadataDef,
                    metadataKey,
                    target,
                    parameterType: types[descriptor],
                    parameterIndex: descriptor
                });
                const ast = new ConstructorAst(target, metadataKey, metadataDef, types[descriptor], descriptor, sourceRoot);
                visitor.visitConstructor(ast, context)
            } else {
                // class
                const context = parserManager.getContext(target);
                metadataDef = getDefault({
                    type: 'class',
                    metadataDef,
                    metadataKey,
                    target
                });
                const ast = new ClassAst(target, metadataKey, metadataDef, sourceRoot);
                visitor.visitClass(ast, context);
                return target;
            }
        }
    }
}

export interface Abstract<T> extends Function {
    prototype: T;
}
export declare type Provider<T = any> = Type<any> | ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>;
export type ProvideKey = string | symbol | Type<any> | Abstract<any>;
export interface ClassProvider<T = any> {
    provide: ProvideKey;
    useClass: Type<T>;
}
export function isClassProvider<T>(val: any): val is ClassProvider<T> {
    return typeof val.useClass === 'function'
}
export interface ValueProvider<T = any> {
    provide: ProvideKey;
    useValue: T;
}
export function isValueProvider<T>(val: any): val is ValueProvider<T> {
    return !!val.useValue
}
export interface FactoryProvider<T = any> {
    provide: ProvideKey;
    useFactory: (...args: any[]) => T;
    deps?: any[]
}
export function isFactoryProvider<T>(val: any): val is FactoryProvider<T> {
    return typeof val.useFactory === 'function'
}