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
    /** 代号 */
    @Column()
    name: string = '';
    /**
     * 名称
     */
    @Column()
    title: string = '';
    /**
     * 入口
     */
    @Column()
    entry: string = '';
    /**
     * 作者
     */
    @Column()
    author: string = '';
    /**
     * 图标
     */
    @Column()
    icon: string = '';
    /**
     * 轮播
     */
    @Column({
        type: 'string',
        transformer: {
            to(value: string[]) {
                return JSON.stringify(value)
            },
            from(value: string) {
                return JSON.parse(value)
            },
        }
    })
    thumbs: string[] = [];
    /**
    * 简介
    */
    @Column()
    desc: string = '';
    /** 是否可用 */
    @Column()
    enable: boolean = false;
    /**
     * 版本号
     */
    @Column()
    version: string = '1.0.0';

    @Column()
    isLocal: boolean;
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