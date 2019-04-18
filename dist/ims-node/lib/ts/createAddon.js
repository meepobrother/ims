"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const createController_1 = require("./createController");
function createAddon(root) {
    try {
        const incPath = path_1.join(root, 'inc');
        const paths = fs_extra_1.default.readdirSync(incPath);
        const output = path_1.join(root, 'template/inc');
        paths.map(file => {
            createPath(incPath, file, output);
        });
    }
    catch (e) {
        console.log(e.message);
    }
}
exports.createAddon = createAddon;
function createPath(root, file, output) {
    const p = path_1.join(root, file);
    const o = path_1.join(output, file);
    const stat = fs_extra_1.default.statSync(p);
    if (stat.isFile()) {
        if (p.endsWith('.ts')) {
            try {
                createController_1.createController(p, o);
            }
            catch (e) {
                console.log(`createPath:`, e.message);
            }
        }
    }
    else if (stat.isDirectory()) {
        const files = fs_extra_1.default.readdirSync(p);
        files.map(file => {
            createPath(p, file, o);
        });
    }
}
