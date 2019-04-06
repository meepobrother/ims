import { Addon } from 'ims-core';
import { ImsBbsTypeorm } from './typeorm'
import { ImsBbsTemplate } from './template'

@Addon({
    template: ImsBbsTemplate,
    typeorm: ImsBbsTypeorm,
    sourceRoot: __dirname
})
export default class ImsBbs { }
