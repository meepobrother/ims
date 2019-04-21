import { Type } from 'ims-decorator';
export interface IRouter {
    path?: string;
    component?: any;
    name?: string;
    roles?: string[];
    icon?: string;
    hideChildrenInMenu?: boolean;
    routes?: IRouter[];
    redirect?: string;
    store?: {
        [key: string]: any;
    };
    exact?: boolean;
}
export interface AddonOptions {
    /**
     * 英文名
     */
    name?: string;
    /**
     * 中文名
     */
    title?: string;
    /**
     * 版本号
     */
    version?: string;
    /**
     * 应用简介
     */
    desc?: string;
    /**
     * icon 大图标
     */
    icon?: string;
    /**
     * logo 小图
     */
    logo?: string;
    /**
     * 作者
     */
    author?: string;
    /**
     * 轮播图
     */
    thumbs?: string[];
    /**
     * 详情
     */
    detail?: string;
    /** 根路由 */
    path?: string;
    /** 开发者模式 */
    dev?: boolean;
    /**
     * api
     */
    incs?: Type<any>[];
    /**
     * 数据库
     */
    typeorm?: object;
    /**
     * 模板
     */
    template?: any;
    /** 父模块 */
    parent?: any;
    /** 以来模块 */
    dependencies?: string[];
}
export interface ControllerOptions {
    path: string;
    childern?: Type<any>[];
    role?: string | string[];
}
export interface RouterOptions {
    /**
     * 跳转
     */
    redirect?: any;
    /**
     * 过滤
     */
    filter?: Type<any>;
    /**
     * 路径
     */
    path?: string;
    /**
     * 组件
     */
    component?: string;
    /**
     * 标题
     */
    name?: string;
    /**
     * 权限
     */
    roles?: Type<any>[];
    /**
     * 图标
     */
    icon?: string;
    /**
     * 隐藏menu
     */
    hideChildrenInMenu?: boolean;
    /**
     * 子菜单
     */
    routes?: Type<any>[];
    /**
     * 精确匹配
     */
    exact?: boolean;
    /**
     * store
     */
    store?: {
        [key: string]: string;
    };
}
export interface TemplateOptions {
    /** 移动端 */
    mobiles?: IRouter[];
    /** 管理端 */
    admins?: IRouter[];
    /** pc端 */
    pc?: IRouter[];
    app?: any;
}
export interface TypeormOptions {
    /**
     * 表
     */
    entities?: any[] | object;
    /**
     * 迁移
     */
    migrations?: any[] | object;
    /**
     * 事件
     */
    subscribers?: any[] | object;
    /**
     * 数据库前缀
     */
    prev?: string;
}
export interface VersionOptions {
}
export declare type BodyOptions = string;
export interface NextOptions {
}
export declare type QueryOptions = string;
export interface RenderOptions {
}
export interface ReqOptions {
}
export interface ResOptions {
}
export interface SessionOptions {
}
export declare type ParamsOptions = 'string';
export interface RedirectOptions {
}
export declare type UploadOptions = string;
export interface UploadsOptions {
}
