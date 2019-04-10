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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImsCommandBuild_1;
const ims_core_1 = require("ims-core");
const root = process.cwd();
const chalk_1 = __importDefault(require("chalk"));
const gulp_1 = __importDefault(require("gulp"));
const ts = require("gulp-typescript");
const path_1 = require("path");
const rimraf = require("rimraf");
const shelljs_1 = require("shelljs");
let ImsCommandBuild = ImsCommandBuild_1 = class ImsCommandBuild {
    constructor() {
        this.root = root;
        this.name = 'all';
        this.tag = 'build';
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.name === 'all') {
                const packages = [
                    'ims-proxy', 'ims-protons', 'ims-adminer',
                    'ims-cli', 'ims-common', 'ims-core',
                    'ims-decorator', 'ims-platform-cli',
                    'ims-platform-express', 'ims-platform-typeorm',
                    'ims-types', 'ims-util', 'ims-webpack', 'ims-webpack-admin',
                    'ims-webpack-mobile', 'ims-website'
                ];
                for (let pk of packages) {
                    yield _rimraf(path_1.join(root, 'dist', pk));
                    yield packProject(pk);
                    console.log(`${chalk_1.default.cyan(pk)}: ${chalk_1.default.yellow(`构建完成!`)}`);
                }
                shelljs_1.exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                    cwd: root
                });
            }
            else {
                yield _rimraf(path_1.join(root, 'dist', this.name));
                yield packProject(this.name);
                console.log(`${chalk_1.default.cyan(this.name)}: ${chalk_1.default.yellow(`构建完成!`)}`);
                shelljs_1.exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                    cwd: root
                });
            }
        });
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsCommandBuild_1();
        return this.instance;
    }
};
__decorate([
    ims_core_1.Input({
        alis: 'n'
    }),
    __metadata("design:type", String)
], ImsCommandBuild.prototype, "name", void 0);
__decorate([
    ims_core_1.Input({
        alis: 't'
    }),
    __metadata("design:type", String)
], ImsCommandBuild.prototype, "tag", void 0);
__decorate([
    ims_core_1.Input(),
    __metadata("design:type", String)
], ImsCommandBuild.prototype, "target", void 0);
ImsCommandBuild = ImsCommandBuild_1 = __decorate([
    ims_core_1.Command({
        name: 'build',
        alis: 'b'
    })
], ImsCommandBuild);
exports.ImsCommandBuild = ImsCommandBuild;
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
function packProject(name) {
    const destPath = path_1.join(root, 'dist', name);
    const srcPath = path_1.join(root, 'packages', name);
    const tsProject = ts.createProject(path_1.join(root, 'tsconfig.json'));
    const tscTask = gulp_1.default.src(`${srcPath}/**/*.{ts,tsx}`)
        .pipe(tsProject()).pipe(gulp_1.default.dest(destPath));
    const otherTask = gulp_1.default.src([
        `${srcPath}/**/*.{md,json,html,css,jpg,jpeg,svg,png,js,jsx,yml}`,
    ]).pipe(gulp_1.default.dest(destPath));
    return Promise.all([
        createTask(tscTask).then(() => {
            console.log(chalk_1.default.yellow(`${name}:tsc finish`));
        }),
        createTask(otherTask).then(() => console.log(chalk_1.default.yellow(`${name}:copy finish`)))
    ]);
}
