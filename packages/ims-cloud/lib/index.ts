import { Addon } from 'ims-core'
import { ImsCloudTemplate } from './template'
import { ImsCloudTypeorm } from './typeorm'
import * as incs from './inc'
@Addon({
    incs,
    typeorm: ImsCloudTypeorm,
    template: ImsCloudTemplate,
    sourceRoot: __dirname
})
export class ImsCloud { }
