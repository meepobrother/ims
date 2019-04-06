import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'ims-core';

@Entity()
export class ImsToken {
    /**
     * openid
     */
    @PrimaryColumn()
    openid: string;
    /**
     * uniacid
     */
    @Column()
    uniacid: number;
    /**
     * access token
     */
    @Column()
    access_token: string;
    /**
     * 过期时间
     */
    @Column()
    expires_in: string;
    /**
     * 刷新token
     */
    @Column()
    refresh_token: string;
    /**
     * scope
     */
    @Column()
    scope: string;
    /**
     * 创建时间
     */
    @CreateDateColumn()
    create_at: string;
}
