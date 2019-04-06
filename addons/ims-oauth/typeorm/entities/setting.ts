import { Entity, PrimaryColumn, Column } from 'ims-core';
/**
 * 设置
 */
@Entity()
export class ImsSetting {
    /**
     * 索引
     */
    @PrimaryColumn()
    key: string;
    /**
     * 值
     */
    @Column()
    val: string;
}
