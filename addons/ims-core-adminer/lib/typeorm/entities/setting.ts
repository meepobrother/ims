import { Entity, PrimaryGeneratedColumn } from "ims-core";
import { Column } from "typeorm";

@Entity()
export class ImsSetting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;
}
