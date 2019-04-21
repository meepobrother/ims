"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const config = lib_1.nginx.createNginxConfig([{
        path: 'home',
        name: 'home',
        upstream: [{
                ip: '127.0.0.1',
                port: 4200
            }]
    }, {
        path: 'demo',
        name: 'demo',
        upstream: [{
                ip: '127.0.0.1',
                port: 4201
            }]
    }]);
fs_extra_1.default.writeFileSync(path_1.join(__dirname, '1.conf'), config);
debugger;
