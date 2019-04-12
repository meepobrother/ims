import { ClassContext, TypeContext, ClassAst, MethodContext, ParserAstContext, PropertyContext, ParameterContext, MethodAst } from 'ims-decorator'
import * as K from './keys';
import * as T from './type';
import { kebabCase } from 'lodash';
import { EntityMetadataKey, EntityAst, MigrationAst, MigrationMetadataKey, EventSubscriberAst, EventSubscriberMetadataKey } from '../../orm';
import { DeleteMetadataKey, GetMetadataKey, HeadMetadataKey, PostMetadataKey, OptionMetadataKey, PatchMetadataKey, PutMetadataKey } from '../../methods';
export class AddonAst extends ClassContext<T.AddonOptions> {
    path: string;
    incs: TypeContext[] = [];
    typeorm: TypeContext;
    template: TypeContext;
    name: string;
    constructor(ast: ClassAst<T.AddonOptions>, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        if (def.template) {
            this.template = context.visitType(def.template)
        }
        if (def.typeorm) {
            this.typeorm = context.visitType(def.typeorm)
        }
        if (def.incs) {
            this.incs = Object.keys(def.incs).map(key => context.visitType(def.incs[key]))
        }
        if (def.type === 'system') {
            this.path = ''
        } else {
            this.path = `/${kebabCase(this.ast.target.name)}`;
        }
        this.name = kebabCase(this.ast.target.name);
        if (!this.sourceRoot) throw new Error(`${kebabCase(ast.target.name)} addon need set sourceRoot`)
    }

    getPath() {
        return this.path
    }

    getIncs() {
        return this.getIncsAst().map(inc => inc)
    }

    getIncsAst(): ControllerAst[] {
        return this.incs.map(inc => inc.getClass<ControllerAst>(K.ControllerMetadataKey))
    }
    /**
     * 获取typeorm配置
     */
    getTypeorm() {
        const typeormAst = this.getTypeormAst()
        return typeormAst && typeormAst.getConfig()
    }
    getTypeormAst(): TypeormAst {
        if (this.typeorm) {
            return this.typeorm.getClass<TypeormAst>(K.TypeormMetadataKey)
        }
    }
    /**
     * 获取template配置
     */
    getTemplate() {
        return this.getTemplateAst().getConfig()
    }
    getTemplateAst(): TemplateAst {
        return this.template.getClass<TemplateAst>(K.TemplateMetadataKey)
    }
}

export class ControllerAst extends ClassContext<T.ControllerOptions> {
    path: string;
    constructor(ast: ClassAst<T.ControllerOptions>, context: ParserAstContext) {
        super(ast, context)
        if (this.ast.metadataDef)
            this.path = this.ast.metadataDef.path || '/';
        else {
            this.path = `/`
        }
    }
    deletesAst(): MethodAst[] {
        return this.context.getMethod(DeleteMetadataKey)
    }
    getsAst(): MethodAst[] {
        return this.context.getMethod(GetMetadataKey)
    }
    heads(): MethodAst[] {
        return this.context.getMethod(HeadMetadataKey)
    }
    posts(): MethodAst[] {
        return this.context.getMethod(PostMetadataKey)
    }
    options(): MethodAst[] {
        return this.context.getMethod(OptionMetadataKey)
    }
    patchs(): MethodAst[] {
        return this.context.getMethod(PatchMetadataKey)
    }
    puts(): MethodAst[] {
        return this.context.getMethod(PutMetadataKey)
    }
}

export class TemplateAst extends ClassContext<T.TemplateOptions> {
    mobiles: T.IRouter[];
    admins: T.IRouter[];
    constructor(ast: ClassAst, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.mobiles = def.mobiles || [];
        this.admins = def.admins || [];
    }

    getAddon(): AddonAst {
        return this.context.typeContext.parent.getClass(K.AddonMetadataKey) as AddonAst
    }

    handleIRouter(iroutes: T.IRouter[], parent?: T.IRouter): T.IRouter[] {
        const addon = this.getAddon();
        if (iroutes && addon && iroutes.length > 0) {
            if (parent) {
                const results: T.IRouter[] = [];
                iroutes.forEach(route => {
                    let { path, component, routes, store } = { ...route };
                    const r = {
                        ...route,
                        routes: this.handleIRouter(routes, route)
                    }
                    if (!!path && path !== '/') {
                        r.path = `${parent.path}${path}`
                    } else {
                        r.path = parent.path;
                    }
                    if (!!component) {
                        r.component = `${addon.sourceRoot}/template/${component}`
                    }
                    if (!!store) {
                        r.store = {};
                        Object.keys(store).map(key => {
                            const val = store[key];
                            r.store[key] = `${addon.sourceRoot}/template/${val}`
                        });
                    }
                    r.routes = this.handleIRouter(routes, r);
                    results.push(r);
                    return route;
                });
                return results;
            } else {
                const results: T.IRouter[] = [];
                iroutes.forEach(route => {
                    let { path, component, routes, store } = { ...route };
                    if (!path.startsWith('/')) {
                        path = `/${path}`;
                    }
                    const r = {
                        ...route,
                    }
                    if (!!path && path !== '/') {
                        r.path = `${addon.path}${path}`
                    } else {
                        r.path = addon.path;
                    }
                    if (!!component) {
                        r.component = `${addon.sourceRoot}/template/${component}`
                    }
                    if (!!store) {
                        r.store = {};
                        Object.keys(store).map(key => {
                            const val = store[key];
                            r.store[key] = `${addon.sourceRoot}/template/${val}`
                        });
                    }
                    r.routes = this.handleIRouter(routes, r);
                    results.push(r);
                });
                return results;
            }
        }
        return [];
    }
    config: {
        mobiles: T.IRouter[];
        admins: T.IRouter[];
    }
    getConfig() {
        if (this.config) {
            return this.config
        };
        this.config = {
            mobiles: this.handleIRouter(this.mobiles),
            admins: this.handleIRouter(this.admins)
        }
        return this.config;
    }
}
export class TypeormAst extends ClassContext<T.TypeormOptions> {
    entities: TypeContext[];
    migrations: TypeContext[];
    subscribers: TypeContext[];
    constructor(ast: ClassAst, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.entities = this.forEachObjectToTypeContent(def && def.entities)
        this.migrations = this.forEachObjectToTypeContent(def && def.migrations)
        this.subscribers = this.forEachObjectToTypeContent(def && def.subscribers)
    }
    getConfig() {
        return {
            entities: this.getEntities(),
            migrations: this.getMigrations(),
            subscribers: this.getSubscribers()
        }
    }
    getEntities() {
        return this.getEntitiesAst().map(entity => entity.target)
    }
    getMigrations() {
        return this.getMigrationsAst().map(entity => entity.target)
    }
    getSubscribers() {
        return this.getSubscribersAst().map(entity => entity.target)
    }
    getEntitiesAst(): EntityAst[] {
        return this.entities.map(entity => entity.getClass<EntityAst>(EntityMetadataKey))
    }
    getMigrationsAst(): MigrationAst[] {
        return this.migrations.map(entity => entity.getClass<MigrationAst>(MigrationMetadataKey))
    }
    getSubscribersAst(): EventSubscriberAst[] {
        return this.subscribers.map(entity => entity.getClass<EventSubscriberAst>(EventSubscriberMetadataKey))
    }
}

export class CliAst extends ClassContext<T.CliOptions> {
    name: string;
    version: string;
    desc: string;
    commands: TypeContext[] = [];
    constructor(ast: ClassAst<T.CliOptions>, context: ParserAstContext) {
        super(ast, context);
        this.commands = ast.metadataDef.commands.map(command => context.visitor.visitType(command));
        const def = ast.metadataDef;
        this.name = def.name;
        this.version = def.version;
        this.desc = def.desc;
    }
}

export class CommandAst extends ClassContext<T.CommandOptions>{
    name: string;
    alis: string;
    constructor(ast: ClassAst<T.CommandOptions>, context: ParserAstContext) {
        super(ast, context);
        const def = ast.metadataDef;
        this.name = def.name;
        this.alis = def.alis
    }
}
export class VersionAst extends PropertyContext<T.VersionOptions>{ }
export class BodyAst extends ParameterContext<T.BodyOptions> { }
export class NextAst extends ParameterContext<T.NextOptions> { }
export class QueryAst extends ParameterContext<T.QueryOptions>{ }
export class RedirectAst extends ParameterContext<T.RedirectOptions>{
    getMethod(): MethodContext<any> {
        return this.context.typeContext.methods.find(method => {
            return method.ast.propertyKey === this.ast.propertyKey
        });
    }
}
export class RenderAst extends ParameterContext<T.RenderOptions> { }
export class ReqAst extends ParameterContext<T.ReqOptions>{ }
export class ResAst extends ParameterContext<T.ResOptions>{ }
export class SessionAst extends ParameterContext<T.SessionOptions> { }
export class UploadAst extends ParameterContext<T.UploadOptions>{ }
export class UploadsAst extends ParameterContext<T.UploadsOptions>{ }
