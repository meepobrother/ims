"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const template_1 = require("./template");
const inc_1 = require("./inc");
const index_1 = require("./typeorm/index");
let ImsCoreEditor = class ImsCoreEditor {
};
ImsCoreEditor = __decorate([
    ims_core_1.Addon({
        incs: [inc_1.ImsCoreEditorInc],
        template: template_1.ImsCoreEditorTemplate,
        typeorm: index_1.ImsCoreEditorTypeorm,
        sourceRoot: __dirname
    })
], ImsCoreEditor);
exports.default = ImsCoreEditor;
