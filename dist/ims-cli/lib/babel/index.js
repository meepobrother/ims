"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
let ImsBabel = class ImsBabel {
    run() {
    }
};
tslib_1.__decorate([
    ims_common_1.Input(),
    tslib_1.__metadata("design:type", String)
], ImsBabel.prototype, "dir", void 0);
tslib_1.__decorate([
    ims_common_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], ImsBabel.prototype, "watch", void 0);
tslib_1.__decorate([
    ims_common_1.Input(),
    tslib_1.__metadata("design:type", String)
], ImsBabel.prototype, "outDir", void 0);
ImsBabel = tslib_1.__decorate([
    ims_common_1.Command({
        name: 'babel'
    })
], ImsBabel);
exports.ImsBabel = ImsBabel;
