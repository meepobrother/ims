import { camelCase } from 'lodash';

export default function (name: string) {
    const addonName = camelCase(name);
    return `import { Controller, Get } from 'ims-core'
@Controller({
    path: '/setting'
})
export class ${addonName}Setting {
    @Get()
    getSetting() {}
}`
}