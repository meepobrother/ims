import { Addon } from 'ims-core';
import { ImsWebsiteTemplate } from './template'
import { ImsWebsiteTypeorm } from './typeorm'

/**
 * 官网
 */
@Addon({
    sourceRoot: __dirname,
    incs: [],
    template: ImsWebsiteTemplate,
    typeorm: ImsWebsiteTypeorm
})
export class ImsWebsite { }
