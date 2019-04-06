import { Typeorm } from 'ims-core'
@Typeorm({
    entities: [],
    migrations: [],
    subscribers: [],
    prev: 'ims'
})
export class ImsAddonTypeOrm { }
export * from './entities';