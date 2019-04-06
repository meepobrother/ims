"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var ImsCommandBuild_1;
const ims_common_1 = require("ims-common");
const root = process.cwd();
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const gulp_1 = tslib_1.__importDefault(require("gulp"));
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
    async run() {
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
                console.log(pk);
                await _rimraf(path_1.join(root, 'dist', pk));
                await packProject(pk);
                console.log(`${chalk_1.default.cyan(pk)}: ${chalk_1.default.yellow(`构建完成!`)}`);
            }
            shelljs_1.exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                cwd: root
            });
        }
        else {
            await _rimraf(path_1.join(root, 'dist', this.name));
            await packProject(this.name);
            console.log(`${chalk_1.default.cyan(this.name)}: ${chalk_1.default.yellow(`构建完成!`)}`);
            shelljs_1.exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                cwd: root
            });
        }
    }
    static create() {
        if (this.instance)
            return this.instance;
        this.instance = new ImsCommandBuild_1();
        return this.instance;
    }
};
tslib_1.__decorate([
    ims_common_1.Input({
        alis: 'n'
    }),
    tslib_1.__metadata("design:type", String)
], ImsCommandBuild.prototype, "name", void 0);
tslib_1.__decorate([
    ims_common_1.Input({
        alis: 't'
    }),
    tslib_1.__metadata("design:type", String)
], ImsCommandBuild.prototype, "tag", void 0);
tslib_1.__decorate([
    ims_common_1.Input(),
    tslib_1.__metadata("design:type", String)
], ImsCommandBuild.prototype, "target", void 0);
ImsCommandBuild = ImsCommandBuild_1 = tslib_1.__decorate([
    ims_common_1.Command({
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
        `${srcPath}/**/*.{md,json,html,css,jpg,jpeg,svg,png,js,jsx}`,
    ]).pipe(gulp_1.default.dest(destPath));
    return Promise.all([
        createTask(tscTask).then(() => {
            console.log(chalk_1.default.yellow(`${name}:tsc finish`));
        }),
        createTask(otherTask).then(() => console.log(chalk_1.default.yellow(`${name}:copy finish`)))
    ]);
}
