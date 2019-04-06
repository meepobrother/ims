export * from './entities';
import { Typeorm } from 'ims-core'
import * as entities from './entities'
@Typeorm({
    entities: entities,
    migrations: [],
    subscribers: []
})
export class ImsModelTypeorm { }