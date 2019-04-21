"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(name, title, version) {
    const addonName = lodash_1.camelCase(name);
    return `import { Addon } from "ims-core";
import { ${addonName}Template } from './template'
import { ${addonName}Typeorm } from './typeorm'
import * as incs from './inc';
@Addon({
    template: ${addonName}Template,
    typeorm: ${addonName}Typeorm,
    incs: incs,
    sourceRoot: __dirname,
    path: '/',
    title: "${title}",
    version: "${version}"
})
export default class ${addonName} { }
`;
}
exports.default = default_1;
