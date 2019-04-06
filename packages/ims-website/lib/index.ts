import { Addon } from 'ims-core';
import { ImsWebsiteTemplate } from './template'
import { ImsWebsiteTypeorm } from './typeorm'

/**
 * 官网
 */
@Addon({
    sourceRoot: __dirname,
    template: ImsWebsiteTemplate,
    typeorm: ImsWebsiteTypeorm
})
export default class ImsWebsite { }
