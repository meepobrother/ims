import { camelCase } from 'lodash';

export default function (name: string, title: string, version: string) {
    const addonName = camelCase(name)
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
`
}