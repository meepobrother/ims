import { Addon } from 'ims-core';
import { ImsDevelementTypeorm } from './typeorm';
import { ImsDevelementTemplate } from './template';

@Addon({
    name: '控制台',
    incs: [],
    template: ImsDevelementTemplate,
    typeorm: ImsDevelementTypeorm,
    sourceRoot: __dirname
})
export class ImsDevelement { }
