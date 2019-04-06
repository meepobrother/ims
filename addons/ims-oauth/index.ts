import { Addon } from 'ims-core';
import * as incs from './inc';
import { ImsOauthTemplate } from './template'
import { ImsOauthTypeorm } from './typeorm'

@Addon({
    incs: incs,
    sourceRoot: __dirname,
    template: ImsOauthTemplate,
    typeorm: ImsOauthTypeorm
})
export default class ImsOauth { }

import * as template from './template'
import * as typeorm from './typeorm'

export {
    template,
    typeorm,
    incs
}