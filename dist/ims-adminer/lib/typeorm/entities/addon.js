"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
let ImsAddonEntity = class ImsAddonEntity {
    constructor() {
        /**
         * 轮播
         */
        this.thumbs = [];
    }
};
tslib_1.__decorate([
    ims_core_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], ImsAddonEntity.prototype, "id", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "name", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "title", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "entry", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: 'ims'
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "author", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "logo", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "icon", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        type: 'varchar',
        default: '',
        transformer: {
            from: (val) => {
                try {
                    return JSON.parse(val);
                }
                catch (e) {
                    return [];
                }
            },
            to: (val) => {
                return JSON.stringify(val);
            }
        }
    }),
    tslib_1.__metadata("design:type", Array)
], ImsAddonEntity.prototype, "thumbs", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "desc", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "detail", void 0);
tslib_1.__decorate([
    ims_core_1.Column({
        default: '1.0'
    }),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "version", void 0);
tslib_1.__decorate([
    ims_core_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "create_at", void 0);
tslib_1.__decorate([
    ims_core_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", String)
], ImsAddonEntity.prototype, "update_at", void 0);
ImsAddonEntity = tslib_1.__decorate([
    ims_core_1.Entity({
        name: 'ims_addon'
    })
], ImsAddonEntity);
exports.ImsAddonEntity = ImsAddonEntity;
