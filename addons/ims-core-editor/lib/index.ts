import { Addon } from 'ims-core'
import { ImsCoreEditorTemplate } from './template'
import { ImsCoreEditorInc } from './inc'
import { ImsCoreEditorTypeorm } from './typeorm/index'
@Addon({
    incs: [ImsCoreEditorInc],
    template: ImsCoreEditorTemplate,
    typeorm: ImsCoreEditorTypeorm,
    sourceRoot: __dirname
})
export default class ImsCoreEditor { }
