import { Command, Option } from 'ims-core';
const root = process.cwd();
import chalk from 'chalk';
import chokidar from 'chokidar'
import gulp from 'gulp';
import ts = require('gulp-typescript');
import { join, dirname } from 'path';
import rimraf = require('rimraf');
import { exec } from 'shelljs';
import { createAddon } from 'ims-node'
import fs from 'fs-extra';
@Command({
    name: 'build',
    description: '构建一个或多个',
    example: {
        command: `ims build ims-demo -o node_modules`,
        description: '构建ims-demo并输出到node_modules'
    }
})
export class ImsBuild {
    root: string = root;

    // 名称
    @Option({
        alias: 'n',
        description: '项目名称'
    })
    name: string;

    // tag
    @Option({
        alias: 't',
        description: 'tag标签'
    })
    tag: string = 'build';

    // 输出
    @Option({
        alias: 'o',
        description: '输出路径'
    })
    output: string = 'node_modules';

    // 开发
    @Option({
        alias: 'w',
        description: '是否监听文件改变'
    })
    watch: boolean;

    async run() {
        if (this.name) {
            const srcRoot = 'packages';
            if (!this.watch) {
                // 如果非开发模式删除原路径文件
                await _rimraf(join(root, this.output, this.name));
            }
            console.log(`name:${this.name}\noutput:${this.output}\nsrc: ${srcRoot}\nwatch:${!!this.watch}`)
            await packProject(this.name, this.output, srcRoot, !!this.watch);
            if (!this.watch) {
                console.log(`${chalk.cyan(this.name)}: ${chalk.yellow(`构建完成!`)}`);
                exec(`git add . && git commit -m ${this.name}:${this.tag}`, {
                    cwd: root
                });
            }
        } else {
            console.log(`ims b -n "应用名" -o "输出目录"`)
        }
    }

    static instance: any;
    static create() {
        if (this.instance) return this.instance;
        this.instance = new ImsBuild();
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
    let taskTsc = done => {
        const tsProject = ts.createProject(join(root, 'tsconfig.json'));
        const task = gulp.src(src).pipe(tsProject()).pipe(gulp.dest(output))
        task.on('end', () => {
            console.log(chalk.yellow(`${src}:tsc finish ${new Date().getTime()}`))
        });
    }
    let taskCopy = done => {
        const otherTask = gulp.src(src).pipe(gulp.dest(output))
        otherTask.on('end', () => {
            console.log(chalk.yellow(`${src}:copy finish ${new Date().getTime()}`))
            done()
        })
    }
    if (src.endsWith('.ts') || src.endsWith('.tsx')) {
        taskTsc(done => {
            taskTsc = null;
        });
    } else {
        taskCopy(done => {
            taskCopy = null;
        });
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
    const libPath = join(srcPath, 'lib');
    fs.ensureDirSync(libPath)
    if (watch) {
        chokidar.watch(join(libPath, 'inc')).on('all', () => {
            createAddon(libPath);
        });
    } else {
        createAddon(libPath);
    }
    const taskTsc = done => {
        const task = gulp.src(`${srcPath}/**/*.{ts,tsx}`)
            .pipe(tsProject()).pipe(gulp.dest(destPath));
        // 创建 template inc
        // 创建完毕
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
        });
    }
    const taskFn = gulp.series(taskTsc, taskCopy);
    if (watch) {
        return new Promise((resolve) => {
            taskFn(done => {
                const watcher = gulp.watch(`${srcPath}/**/*`);
                watcher.on('change', (filename: string) => {
                    /** 监控改变 */
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
