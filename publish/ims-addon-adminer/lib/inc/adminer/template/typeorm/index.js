"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(name) {
    const addonName = lodash_1.camelCase(name);
    return `import { Typeorm } from 'ims-core'
import * as entities from './entities';
@Typeorm({
    entities,
    migrations: [],
    subscribers: []
})
export class ${addonName}Typeorm { }
export * from './entities/index';
`;
}
exports.default = default_1;
