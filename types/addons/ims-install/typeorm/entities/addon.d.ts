import { ImsAddonRouter } from './addon_router';
export declare class ImsAddon {
    /**
     * 编号
     */
    id: number;
    /**
     * 代号
     */
    appId: string;
    /**
     * 通信秘钥
     */
    publicKey: string;
    /**
     * 公钥
     */
    privateKey: string;
    /**
     * 名称
     */
    title: string;
    /**
     * 入口
     */
    entry: string;
    /**
     * 作者
     */
    author: string;
    /**
     * logo
     */
    logo: string;
    /**
     * 图标
     */
    icon: string;
    /**
     * 轮播
     */
    thumbs: string;
    /**
    * 简介
    */
    desc: string;
    /**
    * 详情
    */
    detail: string;
    /**
     * 版本号
     */
    version: string;
    /**
     * 创建时间
     */
    create_at: string;
    /**
     * 更新时间
     */
    update_at: string;
    pages: ImsAddonRouter[];
}
