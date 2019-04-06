import { OneToMany, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'ims-core';

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
     * 代号
     */
    @Column()
    name: string;
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
     * logo
     */
    @Column()
    logo: string;
    /**
     * 图标
     */
    @Column()
    icon: string;
    /**
     * 轮播
     */
    @Column({
        type: 'varchar',
        transformer: {
            from: (val) => {
                return JSON.parse(val)
            },
            to: (val) => {
                return JSON.stringify(val)
            }
        }
    })
    thumbs: string[];
    /**
    * 简介
    */
    @Column()
    desc: string;
    /**
    * 详情
    */
    @Column()
    detail: string;
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