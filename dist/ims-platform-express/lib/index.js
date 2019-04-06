"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_platform_cli_1 = tslib_1.__importDefault(require("ims-platform-cli"));
const webpacks_1 = require("./webpacks");
const path_1 = require("path");
const webpackAdmin = ims_common_1.PlatformRef.create([
    context => new webpacks_1.ImsWebpacks(context).run()
]);
const express = ims_common_1.PlatformRef.create([], [ims_platform_cli_1.default, webpackAdmin]);
function default_1() {
    const root = process.cwd();
    const app = require(path_1.join(root, 'config/app.json'));
    const appType = require(app.entry).default;
    return express.bootstrap(appType);
}
exports.default = default_1;
