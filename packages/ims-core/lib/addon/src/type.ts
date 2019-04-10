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
    store?: { [key: string]: any };
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
     * 版本号
     */
    version?: string;
    /**
     * 详情
     */
    detail?: string;
    /** 类型 */
    type?: 'system' | 'addon';
    /**
     * api
     */
    incs?: any[] | object;
    /**
     * 数据库
     */
    typeorm?: object;
    /**
     * 模板
     */
    template?: any;
}

export interface ControllerOptions {
    path: string
};

export interface RoleOptions {
    /**
     * 代号
     */
    name: string;
    /**
     * 名称
     */
    title?: string;
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
    store?: { [key: string]: string };
}
export interface TemplateOptions {
    mobiles?: IRouter[],
    admins?: IRouter[],
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

export interface CliOptions {
    /**
     * 名称
     */
    name?: string;
    /**
     * 版本号
     */
    version?: string;
    /**
     * 简介
     */
    desc?: string;
    /**
     * 命令
     */
    commands: any[];
}

export interface CommandOptions {
    name?: string;
    alis?: string;
}

export interface VersionOptions { }
export type BodyOptions = string;
export interface NextOptions { }
export type QueryOptions = string;
export interface RenderOptions { }
export interface ReqOptions { }
export interface ResOptions { }
export interface SessionOptions { }
export interface RedirectOptions { }
export interface UploadOptions { }
export interface UploadsOptions { }
