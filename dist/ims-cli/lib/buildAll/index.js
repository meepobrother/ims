"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImsBuildAll_1;
const ims_core_1 = require("ims-core");
const root = process.cwd();
const chalk_1 = __importDefault(require("chalk"));
const gulp_1 = __importDefault(require("gulp"));
const ts = require("gulp-typescript");
const path_1 = require("path");
const rimraf = require("rimraf");
const fs_extra_1 = __importDefault(require("fs-extra"));
let ImsBuildAll = ImsBuildAll_1 = class ImsBuildAll {
    constructor() {
        this.root = root;
        // 输出
        this.output = 'node_modules';
    }
    async run() {
        const packages = fs_extra_1.default.readdirSync(path_1.join(root, 'packages'));
        for (let str of packages) {
            console.log(`packages:${str}`);
            const srcRoot = 'packages';
            await _rimraf(path_1.join(root, this.output, str));
            console.log(`name:${str}\noutput:${this.output}\nsrc: ${srcRoot}\nwatch:${!!this.watch}`);
            await packProject(str, this.output, srcRoot, !!this.watch);
        }
        const addons = fs_extra_1.default.readdirSync(path_1.join(root, 'addons'));
        for (let str of addons) {
            console.log(`packages:${str}`);
            const srcRoot = 'addons';
            await _rimraf(path_1.join(root, this.output, str));
            console.log(`name:${str}\noutput:${this.output}\nsrc: ${srcRoot}\nwatch:${!!this.watch}`);
            await packProject(str, this.output, srcRoot, !!this.watch);
        }
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsBuildAll_1();
        return this.instance;
    }
};
__decorate([
    ims_core_1.Input({
        alis: 'o'
    }),
    __metadata("design:type", String)
], ImsBuildAll.prototype, "output", void 0);
__decorate([
    ims_core_1.Input({
        alis: 'w'
    }),
    __metadata("design:type", Boolean)
], ImsBuildAll.prototype, "watch", void 0);
ImsBuildAll = ImsBuildAll_1 = __decorate([
    ims_core_1.Command({
        name: 'buildAll',
        alis: 'ba'
    })
], ImsBuildAll);
exports.ImsBuildAll = ImsBuildAll;
function _rimraf(dir) {
    return new Promise((resolve, reject) => {
        rimraf(dir, () => resolve());
    });
}
function packFile(src, output) {
    output = path_1.dirname(output);
    const taskTsc = done => {
        const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
        const task = gulp_1.default.src(src).pipe(tsProject()).pipe(gulp_1.default.dest(output));
        task.on('end', () => {
            console.log(chalk_1.default.yellow(`${src}:tsc finish ${new Date().getTime()}`));
        });
    };
    const taskCopy = done => {
        const otherTask = gulp_1.default.src(src).pipe(gulp_1.default.dest(output));
        otherTask.on('end', () => {
            console.log(chalk_1.default.yellow(`${src}:copy finish ${new Date().getTime()}`));
            done();
        });
    };
    if (src.endsWith('.ts') || src.endsWith('.tsx')) {
        taskTsc(done => { });
    }
    else {
        taskCopy(done => { });
    }
}
function packProject(name, output = 'dist', srcRoot = 'packages', watch = false) {
    const destPath = path_1.join(root, output, name);
    const srcPath = path_1.join(root, srcRoot, name);
    const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
    const taskTsc = done => {
        const task = gulp_1.default.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(gulp_1.default.dest(destPath));
        task.on('end', () => {
            console.log(chalk_1.default.yellow(`${name}:tsc finish ${new Date().getTime()}`));
            done();
        });
    };
    const taskCopy = done => {
        const otherTask = gulp_1.default.src([
            `${srcPath}/**/*.{md,json,html,css,less,scss,sass,jpg,jpeg,svg,png,js,jsx,yml}`,
        ]).pipe(gulp_1.default.dest(destPath));
        otherTask.on('end', () => {
            console.log(chalk_1.default.yellow(`${name}:copy finish ${new Date().getTime()}`));
            done();
        });
    };
    const taskFn = gulp_1.default.series(taskTsc, taskCopy);
    if (watch) {
        return new Promise((resolve) => {
            taskFn(done => {
                const watcher = gulp_1.default.watch(`${srcPath}/**/*`);
                watcher.on('change', (filename) => {
                    packFile(filename, filename.replace(srcRoot, output).replace('.ts', '.js').replace('.tsx', '.jsx'));
                });
                watcher.on('error', () => resolve());
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            gulp_1.default.series(taskFn)(() => resolve());
        });
    }
}
