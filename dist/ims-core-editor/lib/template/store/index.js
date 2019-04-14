"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ims_util_1 = __importDefault(require("ims-util"));
class ImsCoreEditor {
    setTitle(title) {
        this.title = title;
    }
    setContent(content) {
        this.content = content;
    }
    publish() {
        return ims_util_1.default.http.post('/ims-core-editor/saveArticle', {
            title: this.title,
            content: this.content
        });
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsCoreEditor.prototype, "title", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ImsCoreEditor.prototype, "content", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImsCoreEditor.prototype, "setTitle", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImsCoreEditor.prototype, "setContent", null);
exports.default = ImsCoreEditor;
