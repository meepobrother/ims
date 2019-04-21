"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(name) {
    const addonName = lodash_1.camelCase(name);
    return `import { Entity, PrimaryGeneratedColumn, Column } from "ims-core";

@Entity()
export class ${addonName}Setting {
    @PrimaryGeneratedColumn()
    id: number;
}
`;
}
exports.default = default_1;
