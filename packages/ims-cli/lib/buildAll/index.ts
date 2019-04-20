import { Command, Input } from 'ims-core';
const root = process.cwd();
import chalk from 'chalk';
import gulp from 'gulp';
import ts = require('gulp-typescript');
import { join, dirname } from 'path';
import rimraf = require('rimraf');
import fs from 'fs-extra'
@Command({
    name: 'buildAll',
    description: '构建所有',
    example: {
        command: 'ims buildAll -o node_modules',
        description: '构建所有并输出到node_modules目录'
    }
})
export class ImsBuildAll {
    root: string = root;
    // 输出
    @Input({
        alis: 'o'
    })
    output: string = 'node_modules';

    async run() {
        const packages = fs.readdirSync(join(root, 'packages'));
        for (let str of packages) {
            const srcRoot = 'packages';
            await _rimraf(join(root, this.output, str));
            console.log(`name:${str}\noutput:${this.output}\nsrc: ${srcRoot}`)
            await packProject(str, this.output, srcRoot, false);
        }
    }

    static instance: any;
    static create() {
        if (this.instance) return this.instance;
        this.instance = new ImsBuildAll();
        return this.instance;
    }
}

function _rimraf(dir: string) {
    return new Promise((resolve, reject) => {
        rimraf(dir, () => resolve())
    });
}

function packFile(src: string, output: string) {
    output = dirname(output)
    const taskTsc = done => {
        const tsProject = ts.createProject(join(root, 'tsconfig.json'));
        const task = gulp.src(src).pipe(tsProject()).pipe(gulp.dest(output))
        task.on('end', () => {
            console.log(chalk.yellow(`${src}:tsc finish ${new Date().getTime()}`))
        });
    }
    const taskCopy = done => {
        const otherTask = gulp.src(src).pipe(gulp.dest(output))
        otherTask.on('end', () => {
            console.log(chalk.yellow(`${src}:copy finish ${new Date().getTime()}`))
            done()
        })
    }
    if (src.endsWith('.ts') || src.endsWith('.tsx')) {
        taskTsc(done => { })
    } else {
        taskCopy(done => { })
    }
}

function packProject(
    name: string,
    output: string = 'dist',
    srcRoot: string = 'packages',
    watch: boolean = false
) {
    const destPath = join(root, output, name);
    const srcPath = join(root, srcRoot, name);
    const tsProject = ts.createProject(join(root, 'tsconfig.json'));

    const taskTsc = done => {
        const task = gulp.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(gulp.dest(destPath));
        task.on('end', () => {
            console.log(chalk.yellow(`${name}:tsc finish ${new Date().getTime()}`))
            done()
        })
    }
    const taskCopy = done => {
        const otherTask = gulp.src([
            `${srcPath}/**/*.{md,json,html,css,less,scss,sass,jpg,jpeg,svg,png,js,jsx,yml}`,
        ]).pipe(gulp.dest(destPath))
        otherTask.on('end', () => {
            console.log(chalk.yellow(`${name}:copy finish ${new Date().getTime()}`))
            done()
        })
    }
    const taskFn = gulp.series(taskTsc, taskCopy);
    if (watch) {
        return new Promise((resolve) => {
            taskFn(done => {
                const watcher = gulp.watch(`${srcPath}/**/*`)
                watcher.on('change', (filename: string) => {
                    packFile(filename, filename.replace(srcRoot, output).replace('.ts', '.js').replace('.tsx', '.jsx'))
                })
                watcher.on('error', () => resolve())
            });
        })
    } else {
        return new Promise((resolve, reject) => {
            gulp.series(taskFn)(() => resolve())
        });
    }
}
