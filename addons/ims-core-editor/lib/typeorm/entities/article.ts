import { Entity, PrimaryColumn, Column } from 'ims-core';

@Entity()
export class ImsArticle {

    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column({
        type: 'text'
    })
    content: string;
}