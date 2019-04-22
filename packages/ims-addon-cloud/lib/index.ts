import { Addon } from 'ims-core'
import { ImsAddonCloudTypeorm } from './typeorm'
import { NoticesController } from './inc/notices'
@Addon({
    incs: [NoticesController],
    typeorm: ImsAddonCloudTypeorm,
    sourceRoot: __dirname
})
export class ImsAddonCloud { }
