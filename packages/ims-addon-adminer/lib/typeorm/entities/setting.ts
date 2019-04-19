import core = require("ims-core");

@core.Entity()
export class ImsSetting {
    @core.PrimaryGeneratedColumn()
    id: number;

    @core.Column()
    uid: string;
}
