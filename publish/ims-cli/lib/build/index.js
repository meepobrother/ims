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
var ImsBuild_1;
const ims_core_1 = require("ims-core");
const root = process.cwd();
const chalk_1 = __importDefault(require("chalk"));
const chokidar_1 = __importDefault(require("chokidar"));
const gulp_1 = __importDefault(require("gulp"));
const ts = require("gulp-typescript");
const path_1 = require("path");
const rimraf = require("rimraf");
const shelljs_1 = require("shelljs");
const ims_node_1 = require("ims-node");
const fs_extra_1 = __importDefault(require("fs-extra"));
let ImsBuild = ImsBuild_1 = class ImsBuild {
    constructor() {
        this.root = root;
        // tag
        this.tag = 'build';
        // 输出
        this.output = 'node_modules';
    }
    async run() {
        if (this.name) {
            const srcRoot = 'packages';
            if (!this.watch) {
                // 如果非开发模式删除原路径文件
                await _rimraf(path_1.join(root, this.output, this.name));
            }
            console.log(`name:${this.name}\noutput:${this.output}\nsrc: ${srcRoot}\nwatch:${!!this.watch}`);
            await packProject(this.name, this.output, srcRoot, !!this.watch);
            if (!this.watch) {
                console.log(`${chalk_1.default.cyan(this.name)}: ${chalk_1.default.yellow(`构建完成!`)}`);
                shelljs_1.exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                    cwd: root
                });
            }
        }
        else {
            console.log(`ims b -n "应用名" -o "输出目录"`);
        }
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsBuild_1();
        return this.instance;
    }
};
__decorate([
    ims_core_1.Option({
        alias: 'n',
        description: '项目名称'
    }),
    __metadata("design:type", String)
], ImsBuild.prototype, "name", void 0);
__decorate([
    ims_core_1.Option({
        alias: 't',
        description: 'tag标签'
    }),
    __metadata("design:type", String)
], ImsBuild.prototype, "tag", void 0);
__decorate([
    ims_core_1.Option({
        alias: 'o',
        description: '输出路径'
    }),
    __metadata("design:type", String)
], ImsBuild.prototype, "output", void 0);
__decorate([
    ims_core_1.Option({
        alias: 'w',
        description: '是否监听文件改变'
    }),
    __metadata("design:type", Boolean)
], ImsBuild.prototype, "watch", void 0);
ImsBuild = ImsBuild_1 = __decorate([
    ims_core_1.Command({
        name: 'build',
        description: '构建一个或多个',
        example: {
            command: `ims build ims-demo -o node_modules`,
            description: '构建ims-demo并输出到node_modules'
        }
    })
], ImsBuild);
exports.ImsBuild = ImsBuild;
function _rimraf(dir) {
    return new Promise((resolve, reject) => {
        rimraf(dir, () => resolve());
    });
}
function packFile(src, output) {
    output = path_1.dirname(output);
    let taskTsc = done => {
        const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
        const task = gulp_1.default.src(src).pipe(tsProject()).pipe(gulp_1.default.dest(output));
        task.on('end', () => {
            console.log(chalk_1.default.yellow(`${src}:tsc finish ${new Date().getTime()}`));
        });
    };
    let taskCopy = done => {
        const otherTask = gulp_1.default.src(src).pipe(gulp_1.default.dest(output));
        otherTask.on('end', () => {
            console.log(chalk_1.default.yellow(`${src}:copy finish ${new Date().getTime()}`));
            done();
        });
    };
    if (src.endsWith('.ts') || src.endsWith('.tsx')) {
        taskTsc(done => {
            taskTsc = null;
        });
    }
    else {
        taskCopy(done => {
            taskCopy = null;
        });
    }
}
function packProject(name, output = 'dist', srcRoot = 'packages', watch = false) {
    const destPath = path_1.join(root, output, name);
    const srcPath = path_1.join(root, srcRoot, name);
    const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
    const libPath = path_1.join(srcPath, 'lib');
    fs_extra_1.default.ensureDirSync(libPath);
    if (watch) {
        chokidar_1.default.watch(path_1.join(libPath, 'inc')).on('all', () => {
            ims_node_1.createAddon(libPath);
        });
    }
    else {
        ims_node_1.createAddon(libPath);
    }
    const taskTsc = done => {
        const task = gulp_1.default.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(gulp_1.default.dest(destPath));
        // 创建 template inc
        // 创建完毕
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
                    /** 监控改变 */
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
exports.packProject = packProject;
