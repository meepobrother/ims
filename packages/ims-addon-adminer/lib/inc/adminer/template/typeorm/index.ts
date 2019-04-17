import { camelCase } from 'lodash';

export default function (name: string) {
    const addonName = camelCase(name)
    return `import { Typeorm } from 'ims-core'
import * as entities from './entities';
@Typeorm({
    entities,
    migrations: [],
    subscribers: []
})
export class ${addonName}Typeorm { }
export * from './entities/index';
`
}