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
        return this.typeorm.getClass<TypeormAst>(K.TypeormMetadataKey)
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

export class RoleAst extends ClassContext<T.RoleOptions> {
    name: string;
    title: string;
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def.name;
        this.title = def.title;
    }
}

export class RouterAst extends ClassContext<T.RouterOptions> {
    dist: string;
    routes: TypeContext[];
    filter: TypeContext;
    roles: TypeContext[];
    def: T.RouterOptions;
    redirect: string;
    constructor(ast: ClassAst, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef
        this.def = def;
        this.dist = `index.html`;
        if (def.routes) this.routes = def.routes.map(route => this.context.visitType(route));
        if (def.filter) this.filter = this.context.visitType(def.filter)
        if (def.roles) this.roles = def.roles.map(auth => this.context.visitType(auth))
    }
    getName(): string {
        return this.def.name;
    }
    getIcon(): string {
        return this.def.icon;
    }
    getRoute(): T.IRouter {
        const routes = this.getRoutes();
        const path = this.getPath();
        const component = this.getComponent();
        const name = this.getName();
        const roles = this.getRoles();
        const icon = this.getIcon();
        const redirect = this.getRedirect();
        const route: T.IRouter = {
            hideChildrenInMenu: !!this.def.hideChildrenInMenu
        };
        if (path) route.path = path;
        if (component) route.component = component;
        if (name) route.name = name;
        if (roles) route.roles = roles;
        if (routes) route.routes = routes;
        if (icon) route.icon = icon;
        if (redirect) route.redirect = redirect;
        route.exact = !!this.def.exact;
        return route;
    }
    getRoutes(): T.IRouter[] {
        return this.getRoutesAst().map(router => router.getRoute())
    }
    getRoles(): string[] {
        return this.getRolesAst().map(role => role.name)
    }
    getComponent(): string {
        if (this.def.component) {
            let sourceRoot = this.sourceRoot;
            if (sourceRoot) {
                return `${sourceRoot}/${this.def.component}`
            }
            const templateAst = this.getTemplateAst();
            if (templateAst && templateAst.sourceRoot) {
                return `${templateAst.sourceRoot}/${this.def.component}`;
            }
            const addonAst = this.getAddonAst();
            if (addonAst && addonAst.sourceRoot) {
                return `${addonAst.sourceRoot}/template/${this.def.component}`;
            }
        }
    }
    getPath() {
        const addon = this.getAddonAst();
        const parent = this.getParentRouterAst();
        if (!addon) {
            throw new Error(`Decorator Router must desp Addon`)
        }
        if (parent) {
            const parentPath = parent.getPath();
            if (this.def.path === '/') {
                return parentPath;
            }
            return `${parentPath}${this.def.path}`
        }
        if (this.def.path === '/') {
            return addon.path;
        }
        return `${addon.path}${this.def.path}`;
    }
    getParentRouterAst(): RouterAst {
        return this.context.typeContext.parent.getClass(K.RouterMetadataKey)
    }
    getRolesAst(): RoleAst[] {
        this.roles = this.roles || [];
        return this.roles.map(role => role.getClass<RoleAst>(K.RoleMetadataKey))
    }
    getRoutesAst(): RouterAst[] {
        this.routes = this.routes || [];
        return this.routes.map(route => route.getClass<RouterAst>(K.RouterMetadataKey))
    }
    getTemplateAst(): TemplateAst {
        return this.parent.getClass<TemplateAst>(K.TemplateMetadataKey);
    }
    getAddonAst(): AddonAst {
        return this.parent.getClass<AddonAst>(K.AddonMetadataKey);
    }
    getAddon(): AddonAst {
        const templateAst = this.getParent(K.TemplateMetadataKey) as TemplateAst;
        if (templateAst) {
            return templateAst.getParent(K.AddonMetadataKey) as AddonAst;
        }
    }
    getRouterParent(): RouterAst {
        return this.getParent(K.RouterMetadataKey) as RouterAst;
    }
    getRelativePath() {
        const addon = this.getAddon();
        if (addon) {
            return addon.getPath()
        } else {
            return this.def.path
        }
    }
    getRedirect() {
        const { redirect } = this.def;
        if (redirect) {
            if (redirect.startsWith('/')) {
                return this.def.redirect
            } else {
                return `${this.getPath()}/${this.def.redirect}`
            }
        }
    }
}

export class TemplateAst extends ClassContext<T.TemplateOptions> {
    mobiles: TypeContext[];
    admins: TypeContext[];
    constructor(ast: ClassAst, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.mobiles = this.forEachObjectToTypeContent(def && def.mobiles)
        this.admins = this.forEachObjectToTypeContent(def && def.admins)
    }

    getConfig() {
        return {
            mobiles: this.getMobiles(),
            admins: this.getAdmins()
        }
    }

    getMobiles(): T.IRouter[] {
        return this.getMobilesAst().map(mobile => mobile.getRoute())
    }

    getAdmins(): T.IRouter[] {
        return this.getAdminsAst().map(admin => admin.getRoute())
    }

    getMobilesAst(): RouterAst[] {
        return this.mobiles.map(mobile => mobile.getClass(K.RouterMetadataKey))
    }

    getAdminsAst(): RouterAst[] {
        return this.admins.map(mobile => mobile.getClass(K.RouterMetadataKey))
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
