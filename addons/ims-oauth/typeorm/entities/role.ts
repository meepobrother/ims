import { Entity, PrimaryGeneratedColumn, Column } from 'ims-core';
/**
 * 角色
 */
@Entity()
export class ImsRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;
}
