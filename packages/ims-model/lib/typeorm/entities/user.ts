import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'ims-core';
/**
 * 安装插件 
 **/
@Entity({
    name: 'ims_user'
})
export class ImsUserEntity {
    /**
     * 编号
     */
    @PrimaryGeneratedColumn()
    id: number;

    /** 校验码 */
    @Column()
    token: string;
    /**
     * 用户名
     */
    @Column()
    username: string;
    /**
     * 密码
     */
    @Column()
    password: string;

    /**
     * 头像
     */
    @Column()
    avatar: string;
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