/**
 * 安装插件
 **/
export declare class ImsAddonEntity {
    /**
     * 编号
     */
    id: number;
    /** 代号 */
    name: string;
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
     * 图标
     */
    icon: string;
    /**
     * 轮播
     */
    thumbs: string[];
    /**
    * 简介
    */
    desc: string;
    /** 是否可用 */
    enable: boolean;
    /**
     * 版本号
     */
    version: string;
    isLocal: boolean;
    /**
   * 创建时间
   */
    create_at: string;
    /**
     * 更新时间
     */
    update_at: string;
}
