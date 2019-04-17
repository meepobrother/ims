"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
let key;
function getKey() {
    if (key)
        return key;
    const path = path_1.join(process.cwd(), 'config/server.json');
    if (fs_extra_1.default.existsSync(path)) {
        key = require(path);
        return key;
    }
    else {
        throw new Error(`server.json is not found`);
    }
}
exports.getKey = getKey;
