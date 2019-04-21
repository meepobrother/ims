#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_platform_hapi_1 = require("ims-platform-hapi");
const build_1 = require("../../build");
const yargs_1 = __importDefault(require("yargs"));
yargs_1.default.command(`start [project]`, false, (args) => {
    return args;
}, async (argv) => {
    const hapi = new ims_platform_hapi_1.ImsPlatformHapi();
    const project = argv.project;
    console.log(project);
    if (project) {
        await build_1.packProject(project, 'node_modules', 'packages', false);
        hapi.addAddon(require.resolve(project));
    }
    await hapi.init();
}).argv;
