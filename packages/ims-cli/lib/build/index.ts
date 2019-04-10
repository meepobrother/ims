import { Command, Input } from 'ims-core';
const root = process.cwd();
import chalk from 'chalk';
import gulp from 'gulp';
import ts = require('gulp-typescript');
import { join } from 'path';
import rimraf = require('rimraf');
import { exec } from 'shelljs';
const babel = require('gulp-babel');
@Command({
    name: 'build',
    alis: 'b'
})
export class ImsCommandBuild {
    root: string = root;

    @Input({
        alis: 'n'
    })
    name: string = 'all';

    @Input({
        alis: 't'
    })
    tag: string = 'build';

    @Input()
    output: string = 'dist';

    async run() {
        if (this.name === 'all') {
            const packages = [
                'ims-proxy', 'ims-protons', 'ims-adminer',
                'ims-cli', 'ims-common', 'ims-core',
                'ims-decorator', 'ims-platform-cli',
                'ims-platform-express', 'ims-platform-typeorm',
                'ims-types', 'ims-util', 'ims-webpack', 'ims-webpack-admin',
                'ims-webpack-mobile', 'ims-website'
            ]
            for (let pk of packages) {
                await _rimraf(join(root, 'dist', pk));
                await packProject(pk, this.output);
                console.log(`${chalk.cyan(pk)}: ${chalk.yellow(`构建完成!`)}`);
            }
            exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                cwd: root
            });
        } else {
            await _rimraf(join(root, 'dist', this.name));
            await packProject(this.name);
            console.log(`${chalk.cyan(this.name)}: ${chalk.yellow(`构建完成!`)}`);
            exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                cwd: root
            });
        }
    }

    static instance: any;
    static create() {
        if (this.instance) return this.instance;
        this.instance = new ImsCommandBuild();
        return this.instance;
    }
}

function _rimraf(dir: string) {
    return new Promise((resolve, reject) => {
        rimraf(dir, () => resolve())
    })
}

function createTask(task: any) {
    return new Promise((resolve, reject) => {
        task.on('end', () => {
            resolve();
        });
    });
}

function packProject(name: string, output: string = 'dist') {
    const destPath = join(root, output, name);
    const srcPath = join(root, 'packages', name);
    const tsProject = ts.createProject(join(root, 'tsconfig.json'));
    const tscTask = gulp.src(`${srcPath}/**/*.{ts,tsx}`)
        .pipe(tsProject()).pipe(gulp.dest(destPath));
    const otherTask = gulp.src([
        `${srcPath}/**/*.{md,json,html,css,jpg,jpeg,svg,png,js,jsx,yml}`,
    ]).pipe(gulp.dest(destPath))
    return Promise.all([
        createTask(tscTask).then(() => {
            console.log(chalk.yellow(`${name}:tsc finish`))
        }),
        createTask(otherTask).then(() => console.log(chalk.yellow(`${name}:copy finish`)))
    ])
}
