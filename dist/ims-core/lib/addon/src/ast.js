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
        this.path = def.path ? def.path : `/${lodash_1.kebabCase(this.ast.target.name)}`;
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
        if (this.typeorm) {
            return this.typeorm.getClass(K.TypeormMetadataKey);
        }
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
        this.path = this.ast.metadataDef.path || '/';
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
    patchs() {
        return this.context.getMethod(methods_1.PatchMetadataKey);
    }
    puts() {
        return this.context.getMethod(methods_1.PutMetadataKey);
    }
}
exports.ControllerAst = ControllerAst;
class TemplateAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.mobiles = def.mobiles || [];
        this.admins = def.admins || [];
    }
    getAddon() {
        return this.context.typeContext.parent.getClass(K.AddonMetadataKey);
    }
    handleIRouter(iroutes, parent) {
        const addon = this.getAddon();
        if (iroutes && addon && iroutes.length > 0) {
            if (parent) {
                const results = [];
                iroutes.forEach(route => {
                    let { path, component, routes, store } = { ...route };
                    const r = {
                        ...route,
                        routes: this.handleIRouter(routes, route)
                    };
                    if (parent.path.startsWith('//')) {
                        console.log(parent.path);
                    }
                    if (!!path && path !== '/') {
                        if (parent.path === '/') {
                            r.path = path;
                        }
                        else {
                            r.path = `${parent.path}${path}`;
                        }
                    }
                    else {
                        r.path = parent.path;
                    }
                    if (!!component) {
                        r.component = `${addon.sourceRoot}/template/${component}`;
                    }
                    if (!!store) {
                        r.store = {};
                        Object.keys(store).map(key => {
                            const val = store[key];
                            r.store[key] = `${addon.sourceRoot}/template/${val}`;
                        });
                    }
                    r.routes = this.handleIRouter(routes, r);
                    results.push(r);
                    return route;
                });
                return results;
            }
            else {
                const results = [];
                iroutes.forEach(route => {
                    let { path, component, routes, store } = { ...route };
                    if (!path.startsWith('/')) {
                        path = `/${path}`;
                    }
                    const r = {
                        ...route,
                    };
                    if (!!path && path !== '/') {
                        if (addon.path === '/') {
                            r.path = path;
                        }
                        else {
                            r.path = `${addon.path}${path}`;
                        }
                    }
                    else {
                        r.path = addon.path;
                    }
                    if (!!component) {
                        r.component = `${addon.sourceRoot}/template/${component}`;
                    }
                    if (!!store) {
                        r.store = {};
                        Object.keys(store).map(key => {
                            const val = store[key];
                            r.store[key] = `${addon.sourceRoot}/template/${val}`;
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
    getConfig() {
        if (this.config) {
            return this.config;
        }
        ;
        this.config = {
            mobiles: this.handleIRouter(this.mobiles),
            admins: this.handleIRouter(this.admins)
        };
        return this.config;
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
