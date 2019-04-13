import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'ims-core';
@Entity({
    name: 'ims_user_role'
})
export class ImsUserRoleEntity {
    /** 角色编号 */
    @PrimaryGeneratedColumn()
    id: number;
    /** 角色名称 */
    @Column()
    name: string;

    /** 创建时间 */
    @CreateDateColumn()
    create_at: string;

    /** 更新时间 */
    @UpdateDateColumn()
    update_at: string;
}