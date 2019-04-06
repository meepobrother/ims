import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'ims-core';

@Entity({
    name: 'ims_account'
})
export class ImsAccount {
    @PrimaryGeneratedColumn()
    id: number;
    /**
     * 名称
     */
    @Column()
    title: string;
    /**
     * 二维码
     */
    @Column()
    qrcode: string;

    /**
     * appId
     */
    @Column()
    appId: string;
    /**
     * appSecret
     */
    @Column()
    appSecret: string;
    /**
    * 类型
    */
    @Column()
    type: string;
    /**
    * 账户
    */
    @Column()
    uniacid: number;
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
