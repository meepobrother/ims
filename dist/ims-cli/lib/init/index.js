"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const command_1 = require("../command");
const path_1 = require("path");
let ImsInit = class ImsInit extends command_1.ImsCommand {
    constructor() {
        super(...arguments);
        this.path = 'ims';
    }
    run() {
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path));
        /** 模板 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'template'));
        /** 附近 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'attachment'));
        /** 应用 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'addons'));
        /** 数据 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'data'));
        /** package.json */
        /** tsconfig.json */
    }
};
tslib_1.__decorate([
    ims_common_1.Input({
        alis: 'p'
    }),
    tslib_1.__metadata("design:type", String)
], ImsInit.prototype, "path", void 0);
ImsInit = tslib_1.__decorate([
    ims_common_1.Command({
        name: 'init',
        alis: 'i'
    })
], ImsInit);
exports.ImsInit = ImsInit;
