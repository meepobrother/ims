import { Typeorm } from 'ims-core'
import { ImsNotices } from './entities/notices'
@Typeorm({
    entities: [
        ImsNotices
    ]
})
export class ImsAddonCloudTypeorm { }

export {
    ImsNotices
}