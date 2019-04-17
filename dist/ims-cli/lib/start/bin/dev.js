#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import 'ts-node/register';
// import 'tsconfig-paths/register';
require("reflect-metadata");
const api_1 = require("./api");
api_1.bootstrap(process.cwd(), true);
