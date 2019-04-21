import { Addon } from 'ims-core'
import { ImsAddonAccountTypeorm } from './typeorm';
import { ImsAddonAccountTemplate } from './template';

@Addon({
    template: ImsAddonAccountTemplate,
    typeorm: ImsAddonAccountTypeorm,
    sourceRoot: __dirname
})
export default class ImsAddonAccount { }
