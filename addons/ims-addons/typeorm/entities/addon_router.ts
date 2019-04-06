import { Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, Column } from 'ims-core';
@Entity({
    name: 'ims_addon_router'
})
export class ImsAddonRouterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    component: string;

    @Column()
    name: string;

    @Column({
        type: 'varchar',
        transformer: {
            to: (val) => {
                return JSON.stringify(val)
            },
            from: (val) => {
                return JSON.parse(val)
            }
        }
    })
    roles: string[];

    @Column()
    type: string;

    @Column()
    icon: string;

    @Column()
    hideChildrenInMenu: boolean;

    @Column()
    redirect: string;

    @Column()
    exact: boolean;

    @OneToMany(() => ImsAddonRouterEntity, type => type.parent, {
        cascade: ['insert', 'update']
    })
    routes: ImsAddonRouterEntity[];

    @ManyToOne(() => ImsAddonRouterEntity, type => type.routes)
    parent: ImsAddonRouterEntity;
}
