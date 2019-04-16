import { Typeorm } from 'ims-core'
import * as entities from './entities';
@Typeorm({
    entities,
    migrations: [],
    subscribers: []
})
export class imsDemoTypeorm { }
export * from './entities/index';
