import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'ims-core';
/**
 * 安装插件 
 **/
@Entity({
    name: 'ims_addon'
})
export class ImsAddonEntity {
    /**
     * 编号
     */
    @PrimaryGeneratedColumn()
    id: number;
    /**
     * 名称
     */
    @Column()
    title: string;
    /**
     * 入口
     */
    @Column()
    entry: string;
    /**
     * 作者
     */
    @Column()
    author: string;
    /**
     * 图标
     */
    @Column()
    icon: string;
    /**
     * 轮播
     */
    @Column()
    thumbs: string;
    /**
    * 简介
    */
    @Column()
    desc: string;
    /** 是否可用 */
    @Column()
    enable: boolean;
    /**
     * 版本号
     */
    @Column()
    version: string;
    /**
     * 创建时间
     */
    @CreateDateColumn()
    create_at: string;
    /**
     * 更新时间
     */
    @UpdateDateColumn()
    update_at: string;
}