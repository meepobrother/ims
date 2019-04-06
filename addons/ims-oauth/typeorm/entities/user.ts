import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from 'ims-core';

@Entity()
export class ImsUser {
    /**
     * 用户编号
     */
    @PrimaryGeneratedColumn()
    uid: number;

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
     * 加密秘钥
     */
    @Column()
    salt: string;

    /**
     * 注册时间
     */
    @CreateDateColumn()
    create_at: string;
}
