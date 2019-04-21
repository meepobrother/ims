import { Addon } from 'ims-core';
import { ImsDemoTemplate } from './template';
@Addon({
    template: ImsDemoTemplate,
    sourceRoot: __dirname
})
export class ImsDemo { }
