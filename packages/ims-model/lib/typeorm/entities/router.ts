import { Entity, PrimaryGeneratedColumn, Column } from 'ims-core'

/** 每个模块打包 安装到路径 */
@Entity()
export class ImsRouter {

    /** 编号 */
    @PrimaryGeneratedColumn()
    id: number;

    /** 跳转 */
    @Column({
        default: ''
    })
    redirect: string = '';

    /** 路径 */
    @Column({
        default: ''
    })
    path: string = '';

    /** 组件 */
    @Column({
        default: ''
    })
    component: string = '';

    /** 名称 */
    @Column({
        default: ''
    })
    name: string = '';

    /** 图标 */
    @Column({
        default: ''
    })
    icon: string = '';

    /** 权限 */
    @Column({
        type: 'varchar',
        length: 300,
        transformer: {
            from(val) {
                return JSON.parse(val)
            },
            to(val) {
                return JSON.stringify(val)
            }
        }
    })
    authority: string[] = [];

    /** 隐藏 */
    @Column({
        default: false
    })
    hideInMenu: boolean = false;

    /** 过滤 */
    @Column({
        type: 'varchar',
        length: 300,
        transformer: {
            from(val) {
                return JSON.parse(val)
            },
            to(val) {
                return JSON.stringify(val)
            }
        }
    })
    Routes: string[] = [];

    /** 上级编号 */
    @Column({
        default: null
    })
    parent_id: number;
}