"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const medium_editor_1 = __importStar(require("medium-editor"));
exports.extensions = medium_editor_1.extensions;
medium_editor_1.extensions.button.extend({
    name: "uploadImage",
    action: "uploadImage",
    contentDefault: "<b>IMG</b>",
    inputElement: null,
    uploadTask: null,
    validate() { },
    init() { },
    destroy() { }
});
class ImsMediumEditor extends medium_editor_1.default {
}
exports.default = ImsMediumEditor;
var medium_editor_2 = require("medium-editor");
exports.MediumEditor = medium_editor_2.default;
exports.Extension = medium_editor_2.Extension;
exports.Events = medium_editor_2.Events;
exports.getEditorFromElement = medium_editor_2.getEditorFromElement;
exports.parseVersionString = medium_editor_2.parseVersionString;
exports.selection = medium_editor_2.selection;
exports.util = medium_editor_2.util;
exports.version = medium_editor_2.version;
