import { Typeorm } from 'ims-core'
@Typeorm({
    entities: [],
    migrations: [],
    subscribers: []
})
export class ImsCoreAdminerTypeorm { }
export * from './entities/index';

