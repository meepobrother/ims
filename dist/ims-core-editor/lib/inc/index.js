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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const typeorm_1 = require("../typeorm");
const cids_1 = __importDefault(require("cids"));
const multihashing_async_1 = __importDefault(require("multihashing-async"));
let ImsCoreEditorInc = class ImsCoreEditorInc {
    /**
     * 发布文章
     */
    async saveArticle(body) {
        const buf = Buffer.from(body.content);
        return new Promise((resolve, reject) => {
            multihashing_async_1.default(buf, 'sha2-256', async (err, hash) => {
                if (err)
                    reject(err);
                const cid = new cids_1.default(1, 'dag-pb', hash);
                const article = new typeorm_1.ImsArticle();
                article.id = cid.toString();
                article.title = body.title || '';
                article.content = buf.toString('base64');
                await this.article.save(article);
                const pubsubBuf = Buffer.from(JSON.stringify(article));
                this.p2p.pubsub.publish('/ims-core-editor/p2pSaveArticle', pubsubBuf, (err) => { });
                resolve(article);
            });
        });
    }
    delArticle(body) {
        return new Promise((resolve, reject) => {
            this.p2p.pubsub.publish('/ims-core-editor/shareArticle', Buffer.from(JSON.stringify(body)), (err) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
    }
    /**
     * 保存草稿
     **/
    saveDrafts(body) { }
};
__decorate([
    ims_core_1.EntityRepository({
        target: typeorm_1.ImsArticle
    }),
    __metadata("design:type", Object)
], ImsCoreEditorInc.prototype, "article", void 0);
__decorate([
    ims_core_1.P2p(),
    __metadata("design:type", Object)
], ImsCoreEditorInc.prototype, "p2p", void 0);
__decorate([
    ims_core_1.Post(),
    __param(0, ims_core_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImsCoreEditorInc.prototype, "saveArticle", null);
__decorate([
    ims_core_1.Post(),
    __param(0, ims_core_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImsCoreEditorInc.prototype, "delArticle", null);
__decorate([
    ims_core_1.Post(),
    __param(0, ims_core_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImsCoreEditorInc.prototype, "saveDrafts", null);
ImsCoreEditorInc = __decorate([
    ims_core_1.Controller({
        path: '/'
    })
], ImsCoreEditorInc);
exports.ImsCoreEditorInc = ImsCoreEditorInc;
