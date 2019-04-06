"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var ImsCommandVersion_1;
const ims_common_1 = require("ims-common");
let ImsCommandVersion = ImsCommandVersion_1 = class ImsCommandVersion {
    async run() {
        console.log(`${this.version}`);
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsCommandVersion_1();
        return this.instance;
    }
};
tslib_1.__decorate([
    ims_common_1.Version(),
    tslib_1.__metadata("design:type", String)
], ImsCommandVersion.prototype, "version", void 0);
ImsCommandVersion = ImsCommandVersion_1 = tslib_1.__decorate([
    ims_common_1.Command({
        name: 'version',
        alis: 'v'
    })
], ImsCommandVersion);
exports.ImsCommandVersion = ImsCommandVersion;
