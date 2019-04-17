import { Entity, PrimaryGeneratedColumn, Column } from "ims-core";

@Entity()
export class ImsSetting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;
}
