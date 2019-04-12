import MediumEditor, { extensions, ProtoProps, Extension } from 'medium-editor';
extensions.button.extend({
    name: "uploadImage",
    action: "uploadImage",
    contentDefault: "<b>IMG</b>",
    inputElement: null,
    uploadTask: null,
    validate() { },
    init() { },
    destroy() { }
})
export default class ImsMediumEditor extends MediumEditor {

}
export {
    default as MediumEditor, Extension,
    Events, getEditorFromElement,
    parseVersionString, selection, util, version,
    CoreOptions
} from 'medium-editor'

export { extensions }