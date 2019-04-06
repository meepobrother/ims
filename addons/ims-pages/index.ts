import { Addon } from 'ims-core';
import { ImsPagesTypeorm } from './typeorm'
import { ImsPagesTemplate } from './template'
@Addon({
    sourceRoot: __dirname,
    typeorm: ImsPagesTypeorm,
    template: ImsPagesTemplate
})
export class ImsPages { }