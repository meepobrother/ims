import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'ims-core';

@Entity()
export class ImsNotices {
    /** 编号 */
    @PrimaryGeneratedColumn()
    id: number;

    /** 头像 */
    @Column()
    avatar: string;

    /** 标题 */
    @Column()
    title: string;

    /** 时间 */
    @CreateDateColumn()
    datetime: string;

    /** 是否已读 */
    @Column()
    read: boolean;

    /** 消息类型 */
    @Column()
    type: string;

    /** 更新日志 */
    @UpdateDateColumn()
    update_at: string;

    /** 详情连接 */
    @Column()
    link: string;

    /** 发件人 */
    @Column()
    from: number;

    /** 收件人 */
    @Column()
    to: number;
}