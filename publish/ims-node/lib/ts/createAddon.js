"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const createController_1 = require("./createController");
const addon_1 = require("./addon");
function createAddon(root) {
    try {
        const addonPath = addon_1.getAddonPath(path_1.join(root, 'index.ts'));
        const incPath = path_1.join(root, 'inc');
        if (fs_extra_1.default.existsSync(incPath)) {
            const paths = fs_extra_1.default.readdirSync(incPath);
            const output = path_1.join(root, 'template/inc');
            paths.map(file => {
                createPath(incPath, file, output, addonPath);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
exports.createAddon = createAddon;
function createPath(root, file, output, basePath) {
    const p = path_1.join(root, file);
    const o = path_1.join(output, file);
    const stat = fs_extra_1.default.statSync(p);
    if (stat.isFile()) {
        if (p.endsWith('.ts')) {
            createController_1.createController(p, o, basePath);
        }
    }
    else if (stat.isDirectory()) {
        const files = fs_extra_1.default.readdirSync(p);
        files.map(file => {
            createPath(p, file, o, basePath);
        });
    }
}
