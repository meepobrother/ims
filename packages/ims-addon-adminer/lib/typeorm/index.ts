import core = require('ims-core')
@core.Typeorm({
    entities: [],
    migrations: [],
    subscribers: []
})
export class ImsCoreAdminerTypeorm { }
export * from './entities/index';

