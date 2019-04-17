"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memcached_1 = __importDefault(require("memcached"));
const path_1 = require("path");
const root = process.cwd();
function bootstrap() {
    const configFile = path_1.join(root, 'config/config.json');
    const config = require(configFile);
    const memcached = new memcached_1.default(config.memcached);
    return memcached;
}
exports.bootstrap = bootstrap;
