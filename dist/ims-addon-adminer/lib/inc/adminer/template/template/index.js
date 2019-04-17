"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(name) {
    const addonName = lodash_1.camelCase(name);
    return `import { Template } from 'ims-core'
@Template({
    mobiles: [],
    admins: []
})
export class ${addonName}Template { }`;
}
exports.default = default_1;
