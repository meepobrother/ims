"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const root = process.cwd();
const peer_id_1 = __importDefault(require("peer-id"));
async function createPeerId(type = 'server') {
    const configPath = path_1.join(root, `config/${type}.json`);
    fs_extra_1.ensureDirSync(path_1.dirname(configPath));
    return new Promise((resolve, reject) => {
        if (fs_extra_1.existsSync(configPath)) {
            const config = require(configPath);
            return peer_id_1.default.createFromJSON(config, (err, id) => {
                if (err)
                    reject(err);
                resolve(id);
            });
        }
        else {
            return peer_id_1.default.create((err, id) => {
                if (err)
                    reject(err);
                fs_extra_1.writeFileSync(configPath, JSON.stringify(id.toJSON(), null, 2));
                resolve(id);
            });
        }
    });
}
exports.createPeerId = createPeerId;
