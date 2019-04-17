
import { camelCase } from 'lodash';

export default function (name: string) {
    const addonName = camelCase(name)
    return `import { Entity, PrimaryGeneratedColumn, Column } from "ims-core";

@Entity()
export class ${addonName}Setting {
    @PrimaryGeneratedColumn()
    id: number;
}
`
}