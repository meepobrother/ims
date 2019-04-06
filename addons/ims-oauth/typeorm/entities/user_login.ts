import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'ims-core';
/**
 * 登录记录表
 */
@Entity()
export class ImsUserLogin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: number;

    @CreateDateColumn()
    create_at: string;
}
