import { Addon } from 'ims-core';
import { ImsTestTypeorm } from './typeorm'
import { ImsTestTemplate } from './template'
import { ImsIndexInc } from './inc'
@Addon({
    incs: [ImsIndexInc ],
    template: ImsTestTemplate,
    typeorm: ImsTestTypeorm
})
export class ImsTest { }
