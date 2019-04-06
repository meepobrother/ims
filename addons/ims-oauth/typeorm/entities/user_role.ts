import { Entity, PrimaryGeneratedColumn, Column } from 'ims-core';

/**
 * 用户角色表
 */
@Entity()
export class ImsUserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: number;

    @Column()
    roleId: number;
}