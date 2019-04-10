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
const ims_core_1 = require("ims-core");
const root = process.cwd();
const chalk_1 = __importDefault(require("chalk"));
const gulp_1 = __importDefault(require("gulp"));
const ts = require("gulp-typescript");
const path_1 = require("path");
const rimraf = require("rimraf");
const shelljs_1 = require("shelljs");
let ImsBuild = class ImsBuild {
    constructor() {
        this.root = root;
        this.tag = 'build';
        this.output = 'dist';
    }
    async run() {
        if (this.name) {
            const srcRoot = this.system ? 'packages' : 'addons';
            await _rimraf(path_1.join(root, this.output, this.name));
            await packProject(this.name, this.output, srcRoot);
            console.log(`${chalk_1.default.cyan(this.name)}: ${chalk_1.default.yellow(`构建完成!`)}`);
            shelljs_1.exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                cwd: root
            });
        }
        else {
            console.log(`ims b -n "应用名" -o "输出目录"`);
        }
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsCommandBuild();
        return this.instance;
    }
};
__decorate([
    ims_core_1.Input({
        alis: 's'
    }),
    __metadata("design:type", Boolean)
], ImsBuild.prototype, "system", void 0);
__decorate([
    ims_core_1.Input({
        alis: 'n'
    }),
    __metadata("design:type", String)
], ImsBuild.prototype, "name", void 0);
__decorate([
    ims_core_1.Input({
        alis: 't'
    }),
    __metadata("design:type", String)
], ImsBuild.prototype, "tag", void 0);
__decorate([
    ims_core_1.Input({
        alis: 'o'
    }),
    __metadata("design:type", String)
], ImsBuild.prototype, "output", void 0);
ImsBuild = __decorate([
    ims_core_1.Command({
        name: 'build',
        alis: 'b'
    })
], ImsBuild);
exports.ImsBuild = ImsBuild;
function _rimraf(dir) {
    return new Promise((resolve, reject) => {
        rimraf(dir, () => resolve());
    });
}
function createTask(task) {
    return new Promise((resolve, reject) => {
        task.on('end', () => {
            resolve();
        });
    });
}
function packProject(name, output = 'dist', srcRoot = 'packages') {
    const destPath = path_1.join(root, output, name);
    const srcPath = path_1.join(root, srcRoot, name);
    const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
    const tscTask = gulp_1.default.src(`${srcPath}/**/*.{ts,tsx}`)
        .pipe(tsProject()).pipe(gulp_1.default.dest(destPath));
    const otherTask = gulp_1.default.src([
        `${srcPath}/**/*.{md,json,html,css,less,scss,sass,jpg,jpeg,svg,png,js,jsx,yml}`,
    ]).pipe(gulp_1.default.dest(destPath));
    return Promise.all([
        createTask(tscTask).then(() => {
            console.log(chalk_1.default.yellow(`${name}:tsc finish`));
        }),
        createTask(otherTask).then(() => console.log(chalk_1.default.yellow(`${name}:copy finish`)))
    ]);
}
