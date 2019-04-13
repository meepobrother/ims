import { Command, Input } from 'ims-core';
const root = process.cwd();
import chalk from 'chalk';
import gulp from 'gulp';
import ts = require('gulp-typescript');
import { join } from 'path';
import rimraf = require('rimraf');
import { exec } from 'shelljs';
@Command({
    name: 'build',
    alis: 'b'
})
export class ImsBuild {
    root: string = root;

    // 系统
    @Input({
        alis: 's'
    })
    system: boolean;

    // 名称
    @Input({
        alis: 'n'
    })
    name: string;

    // tag
    @Input({
        alis: 't'
    })
    tag: string = 'build';

    // 输出
    @Input({
        alis: 'o'
    })
    output: string = 'dist';

    // 开发
    @Input({
        alis: 'w'
    })
    watch: boolean;

    async run() {
        if (this.name) {
            const srcRoot = this.system ? 'packages' : 'addons';
            await _rimraf(join(root, this.output, this.name));
            await packProject(this.name, this.output, srcRoot, this.watch);
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

function createTask(task: any) {
    return new Promise((resolve, reject) => {
        task.on('end', () => {
            resolve();
        });
    });
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
        taskFn(done => { });
        return new Promise((resolve) => {
            const watcher = gulp.watch(`${srcPath}/**/*.{ts,tsx}`, taskFn)
            watcher.on('error', () => resolve())
        })
    } else {
        return new Promise((resolve, reject) => {
            gulp.series(taskFn)(() => resolve())
        });
    }
}
