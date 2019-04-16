import { Entity, PrimaryGeneratedColumn, Column } from "ims-core";

@Entity()
export class imsDemoSetting {
    @PrimaryGeneratedColumn()
    id: number;
}
