#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const build_1 = require("../../build");
const yargs_1 = __importDefault(require("yargs"));
yargs_1.default.command(`start [project]`, false, (args) => {
    return args;
}, (argv) => {
    const project = argv.project;
    if (project) {
        build_1.packProject(project, 'node_modules', 'projects', true);
    }
}).argv;
