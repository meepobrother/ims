"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const path_1 = require("path");
const pm2 = new index_1.ImsCommandPm2();
pm2.script = path_1.join(__dirname, 'test.run.ts');
pm2.run();
