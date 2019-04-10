"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const K = __importStar(require("./keys"));
const lodash_1 = require("lodash");
const orm_1 = require("../../orm");
const methods_1 = require("../../methods");
class AddonAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        this.incs = [];
        const def = this.ast.metadataDef;
        if (def.template) {
            this.template = context.visitType(def.template);
        }
        if (def.typeorm) {
            this.typeorm = context.visitType(def.typeorm);
        }
        if (def.incs) {
            this.incs = Object.keys(def.incs).map(key => context.visitType(def.incs[key]));
        }
        if (def.type === 'system') {
            this.path = '';
        }
        else {
            this.path = `/${lodash_1.kebabCase(this.ast.target.name)}`;
        }
        this.name = lodash_1.kebabCase(this.ast.target.name);
        if (!this.sourceRoot)
            throw new Error(`${lodash_1.kebabCase(ast.target.name)} addon need set sourceRoot`);
    }
    getPath() {
        return this.path;
    }
    getIncs() {
        return this.getIncsAst().map(inc => inc);
    }
    getIncsAst() {
        return this.incs.map(inc => inc.getClass(K.ControllerMetadataKey));
    }
    /**
     * 获取typeorm配置
     */
    getTypeorm() {
        const typeormAst = this.getTypeormAst();
        return typeormAst && typeormAst.getConfig();
    }
    getTypeormAst() {
        return this.typeorm.getClass(K.TypeormMetadataKey);
    }
    /**
     * 获取template配置
     */
    getTemplate() {
        return this.getTemplateAst().getConfig();
    }
    getTemplateAst() {
        return this.template.getClass(K.TemplateMetadataKey);
    }
}
exports.AddonAst = AddonAst;
class ControllerAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        if (this.ast.metadataDef)
            this.path = this.ast.metadataDef.path || '/';
        else {
            this.path = `/`;
        }
    }
    deletesAst() {
        return this.context.getMethod(methods_1.DeleteMetadataKey);
    }
    getsAst() {
        return this.context.getMethod(methods_1.GetMetadataKey);
    }
    heads() {
        return this.context.getMethod(methods_1.HeadMetadataKey);
    }
    posts() {
        return this.context.getMethod(methods_1.PostMetadataKey);
    }
    options() {
        return this.context.getMethod(methods_1.OptionMetadataKey);
    }
    patchs() {
        return this.context.getMethod(methods_1.PatchMetadataKey);
    }
    puts() {
        return this.context.getMethod(methods_1.PutMetadataKey);
    }
}
exports.ControllerAst = ControllerAst;
class RoleAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def.name;
        this.title = def.title;
    }
}
exports.RoleAst = RoleAst;
class RouterAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.def = def;
        this.dist = `index.html`;
        if (def.routes)
            this.routes = def.routes.map(route => this.context.visitType(route));
        if (def.filter)
            this.filter = this.context.visitType(def.filter);
        if (def.roles)
            this.roles = def.roles.map(auth => this.context.visitType(auth));
    }
    getName() {
        return this.def.name;
    }
    getIcon() {
        return this.def.icon;
    }
    getRoute() {
        const routes = this.getRoutes();
        const path = this.getPath();
        const component = this.getComponent();
        const name = this.getName();
        const roles = this.getRoles();
        const icon = this.getIcon();
        const redirect = this.getRedirect();
        const route = {
            hideChildrenInMenu: !!this.def.hideChildrenInMenu
        };
        if (path)
            route.path = path;
        if (component)
            route.component = component;
        if (name)
            route.name = name;
        if (roles)
            route.roles = roles;
        if (routes)
            route.routes = routes;
        if (icon)
            route.icon = icon;
        if (redirect)
            route.redirect = redirect;
        route.exact = !!this.def.exact;
        const store = this.def.store || {};
        const addonAst = this.getAddonAst();
        route.store = {};
        Object.keys(store).map(key => {
            const val = store[key];
            route.store[`${addonAst.name}-${key}`] = `${addonAst.sourceRoot}/template/${val}`;
        });
        return route;
    }
    getRoutes() {
        return this.getRoutesAst().map(router => router.getRoute());
    }
    getRoles() {
        return this.getRolesAst().map(role => role.name);
    }
    getComponent() {
        if (this.def.component) {
            let sourceRoot = this.sourceRoot;
            if (sourceRoot) {
                return `${sourceRoot}/${this.def.component}`;
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
            throw new Error(`Decorator Router must desp Addon`);
        }
        if (parent) {
            const parentPath = parent.getPath();
            if (this.def.path === '/') {
                return parentPath;
            }
            return `${parentPath}${this.def.path}`;
        }
        if (this.def.path === '/') {
            return addon.path;
        }
        return `${addon.path}${this.def.path}`;
    }
    getParentRouterAst() {
        return this.context.typeContext.parent.getClass(K.RouterMetadataKey);
    }
    getRolesAst() {
        this.roles = this.roles || [];
        return this.roles.map(role => role.getClass(K.RoleMetadataKey));
    }
    getRoutesAst() {
        this.routes = this.routes || [];
        return this.routes.map(route => route.getClass(K.RouterMetadataKey));
    }
    getTemplateAst() {
        return this.parent.getClass(K.TemplateMetadataKey);
    }
    getAddonAst() {
        return this.parent.getClass(K.AddonMetadataKey);
    }
    getAddon() {
        const templateAst = this.getParent(K.TemplateMetadataKey);
        if (templateAst) {
            return templateAst.getParent(K.AddonMetadataKey);
        }
    }
    getRouterParent() {
        return this.getParent(K.RouterMetadataKey);
    }
    getRelativePath() {
        const addon = this.getAddon();
        if (addon) {
            return addon.getPath();
        }
        else {
            return this.def.path;
        }
    }
    getRedirect() {
        const { redirect } = this.def;
        if (redirect) {
            if (redirect.startsWith('/')) {
                return this.def.redirect;
            }
            else {
                return `${this.getPath()}/${this.def.redirect}`;
            }
        }
    }
}
exports.RouterAst = RouterAst;
class TemplateAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.mobiles = this.forEachObjectToTypeContent(def && def.mobiles);
        this.admins = this.forEachObjectToTypeContent(def && def.admins);
    }
    getConfig() {
        return {
            mobiles: this.getMobiles(),
            admins: this.getAdmins()
        };
    }
    getMobiles() {
        return this.getMobilesAst().map(mobile => mobile.getRoute());
    }
    getAdmins() {
        return this.getAdminsAst().map(admin => admin.getRoute());
    }
    getMobilesAst() {
        return this.mobiles.map(mobile => mobile.getClass(K.RouterMetadataKey));
    }
    getAdminsAst() {
        return this.admins.map(mobile => mobile.getClass(K.RouterMetadataKey));
    }
}
exports.TemplateAst = TemplateAst;
class TypeormAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.entities = this.forEachObjectToTypeContent(def && def.entities);
        this.migrations = this.forEachObjectToTypeContent(def && def.migrations);
        this.subscribers = this.forEachObjectToTypeContent(def && def.subscribers);
    }
    getConfig() {
        return {
            entities: this.getEntities(),
            migrations: this.getMigrations(),
            subscribers: this.getSubscribers()
        };
    }
    getEntities() {
        return this.getEntitiesAst().map(entity => entity.target);
    }
    getMigrations() {
        return this.getMigrationsAst().map(entity => entity.target);
    }
    getSubscribers() {
        return this.getSubscribersAst().map(entity => entity.target);
    }
    getEntitiesAst() {
        return this.entities.map(entity => entity.getClass(orm_1.EntityMetadataKey));
    }
    getMigrationsAst() {
        return this.migrations.map(entity => entity.getClass(orm_1.MigrationMetadataKey));
    }
    getSubscribersAst() {
        return this.subscribers.map(entity => entity.getClass(orm_1.EventSubscriberMetadataKey));
    }
}
exports.TypeormAst = TypeormAst;
class CliAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        this.commands = [];
        this.commands = ast.metadataDef.commands.map(command => context.visitor.visitType(command));
        const def = ast.metadataDef;
        this.name = def.name;
        this.version = def.version;
        this.desc = def.desc;
    }
}
exports.CliAst = CliAst;
class CommandAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = ast.metadataDef;
        this.name = def.name;
        this.alis = def.alis;
    }
}
exports.CommandAst = CommandAst;
class VersionAst extends ims_decorator_1.PropertyContext {
}
exports.VersionAst = VersionAst;
class BodyAst extends ims_decorator_1.ParameterContext {
}
exports.BodyAst = BodyAst;
class NextAst extends ims_decorator_1.ParameterContext {
}
exports.NextAst = NextAst;
class QueryAst extends ims_decorator_1.ParameterContext {
}
exports.QueryAst = QueryAst;
class RedirectAst extends ims_decorator_1.ParameterContext {
    getMethod() {
        return this.context.typeContext.methods.find(method => {
            return method.ast.propertyKey === this.ast.propertyKey;
        });
    }
}
exports.RedirectAst = RedirectAst;
class RenderAst extends ims_decorator_1.ParameterContext {
}
exports.RenderAst = RenderAst;
class ReqAst extends ims_decorator_1.ParameterContext {
}
exports.ReqAst = ReqAst;
class ResAst extends ims_decorator_1.ParameterContext {
}
exports.ResAst = ResAst;
class SessionAst extends ims_decorator_1.ParameterContext {
}
exports.SessionAst = SessionAst;
class UploadAst extends ims_decorator_1.ParameterContext {
}
exports.UploadAst = UploadAst;
class UploadsAst extends ims_decorator_1.ParameterContext {
}
exports.UploadsAst = UploadsAst;
