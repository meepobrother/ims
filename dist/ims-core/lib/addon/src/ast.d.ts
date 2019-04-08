import { ClassContext, TypeContext, ClassAst, MethodContext, ParserAstContext, PropertyContext, ParameterContext, MethodAst } from 'ims-decorator';
import * as T from './type';
import { EntityAst, MigrationAst, EventSubscriberAst } from '../../orm';
export declare class AddonAst extends ClassContext<T.AddonOptions> {
    path: string;
    incs: TypeContext[];
    typeorm: TypeContext;
    template: TypeContext;
    name: string;
    constructor(ast: ClassAst<T.AddonOptions>, context: ParserAstContext);
    getPath(): string;
    getIncs(): ControllerAst[];
    getIncsAst(): ControllerAst[];
    /**
     * 获取typeorm配置
     */
    getTypeorm(): {
        entities: any[];
        migrations: any[];
        subscribers: any[];
    };
    getTypeormAst(): TypeormAst;
    /**
     * 获取template配置
     */
    getTemplate(): {
        mobiles: T.IRouter[];
        admins: T.IRouter[];
    };
    getTemplateAst(): TemplateAst;
}
export declare class ControllerAst extends ClassContext<T.ControllerOptions> {
    path: string;
    constructor(ast: ClassAst<T.ControllerOptions>, context: ParserAstContext);
    deletesAst(): MethodAst[];
    getsAst(): MethodAst[];
    heads(): MethodAst[];
    posts(): MethodAst[];
    options(): MethodAst[];
    patchs(): MethodAst[];
    puts(): MethodAst[];
}
export declare class RoleAst extends ClassContext<T.RoleOptions> {
    name: string;
    title: string;
    constructor(ast: any, context: any);
}
export declare class RouterAst extends ClassContext<T.RouterOptions> {
    dist: string;
    routes: TypeContext[];
    filter: TypeContext;
    roles: TypeContext[];
    def: T.RouterOptions;
    redirect: string;
    constructor(ast: ClassAst, context: ParserAstContext);
    getName(): string;
    getIcon(): string;
    getRoute(): T.IRouter;
    getRoutes(): T.IRouter[];
    getRoles(): string[];
    getComponent(): string;
    getPath(): any;
    getParentRouterAst(): RouterAst;
    getRolesAst(): RoleAst[];
    getRoutesAst(): RouterAst[];
    getTemplateAst(): TemplateAst;
    getAddonAst(): AddonAst;
    getAddon(): AddonAst;
    getRouterParent(): RouterAst;
    getRelativePath(): string;
    getRedirect(): any;
}
export declare class TemplateAst extends ClassContext<T.TemplateOptions> {
    mobiles: TypeContext[];
    admins: TypeContext[];
    constructor(ast: ClassAst, context: ParserAstContext);
    getConfig(): {
        mobiles: T.IRouter[];
        admins: T.IRouter[];
    };
    getMobiles(): T.IRouter[];
    getAdmins(): T.IRouter[];
    getMobilesAst(): RouterAst[];
    getAdminsAst(): RouterAst[];
}
export declare class TypeormAst extends ClassContext<T.TypeormOptions> {
    entities: TypeContext[];
    migrations: TypeContext[];
    subscribers: TypeContext[];
    constructor(ast: ClassAst, context: ParserAstContext);
    getConfig(): {
        entities: any[];
        migrations: any[];
        subscribers: any[];
    };
    getEntities(): any[];
    getMigrations(): any[];
    getSubscribers(): any[];
    getEntitiesAst(): EntityAst[];
    getMigrationsAst(): MigrationAst[];
    getSubscribersAst(): EventSubscriberAst[];
}
export declare class CliAst extends ClassContext<T.CliOptions> {
    name: string;
    version: string;
    desc: string;
    commands: TypeContext[];
    constructor(ast: ClassAst<T.CliOptions>, context: ParserAstContext);
}
export declare class CommandAst extends ClassContext<T.CommandOptions> {
    name: string;
    alis: string;
    constructor(ast: ClassAst<T.CommandOptions>, context: ParserAstContext);
}
export declare class VersionAst extends PropertyContext<T.VersionOptions> {
}
export declare class BodyAst extends ParameterContext<T.BodyOptions> {
}
export declare class NextAst extends ParameterContext<T.NextOptions> {
}
export declare class QueryAst extends ParameterContext<T.QueryOptions> {
}
export declare class RedirectAst extends ParameterContext<T.RedirectOptions> {
    getMethod(): MethodContext<any>;
}
export declare class RenderAst extends ParameterContext<T.RenderOptions> {
}
export declare class ReqAst extends ParameterContext<T.ReqOptions> {
}
export declare class ResAst extends ParameterContext<T.ResOptions> {
}
export declare class SessionAst extends ParameterContext<T.SessionOptions> {
}
export declare class UploadAst extends ParameterContext<T.UploadOptions> {
}
export declare class UploadsAst extends ParameterContext<T.UploadsOptions> {
}
