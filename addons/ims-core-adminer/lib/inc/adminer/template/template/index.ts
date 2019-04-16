
import { camelCase } from 'lodash';

export default function (name: string) {
    const addonName = camelCase(name);
    return `import { Template } from 'ims-core'
@Template({
    mobiles: [],
    admins: []
})
export class ${addonName}Template { }`
}