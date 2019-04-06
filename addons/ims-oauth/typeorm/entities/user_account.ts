import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'ims-core';

/**
 * 用户账户表
 */
export class ImsUserAccount {

    @PrimaryGeneratedColumn()
    id: string;

    /**
     * 用户id
     */
    @Column()
    uid: number;

    /**
     * accountId
     */
    @Column()
    aid: number;

    @CreateDateColumn()
    create_at: string;
}
