"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(name) {
    const addonName = lodash_1.camelCase(name);
    return `import { Controller, Get } from 'ims-core'
@Controller({
    path: '/setting'
})
export class ${addonName}Setting {
    @Get()
    getSetting() {}
}`;
}
exports.default = default_1;
