import gulp from 'gulp';
import ts = require('gulp-typescript');
import { join } from 'path';
import rimraf = require('rimraf');
import { exec } from 'shelljs'
const root = process.cwd();
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
function packProject(name: string) {
    const tsProject = ts.createProject(join(root, 'tsconfig.json'));
    const tscTask = gulp.src(`packages/${name}/**/*.ts`)
        .pipe(tsProject()).pipe(gulp.dest(`dist/${name}/`));
    const otherTask = gulp.src([
        `packages/${name}/**/*.{md,json,html,css,jpg,jpeg,svg,png,js}`,
    ]).pipe(gulp.dest(`dist/${name}`))
    return Promise.all([createTask(tscTask), createTask(otherTask)])
}
Promise.all(['ims-proxy', 'ims-protons', 'ims-adminer', 'ims-cli', 'ims-common',
    'ims-core', 'ims-decorator', 'ims-platform-cli',
    'ims-platform-express', 'ims-platform-typeorm',
    'ims-types', 'ims-util', 'ims-webpack', 'ims-webpack-admin',
    'ims-webpack-mobile', 'ims-website'].map(async pk => {
        await _rimraf(join(root, 'dist', pk));
        await packProject(pk);
        console.log(`task ${pk} 完成!`);
    })).then(() => {
        exec(`
        git add .
        git commit -m rebuild
        lerna publish
        `)
    })


exec(`git add .`, {
    cwd: root
}, (code, output, error) => {
    console.log({ code, output, error })
    exec(`git commit -m rebuild`, {
        cwd: root
    }, (code, output, error) => {
        console.log({ code, output, error })
    })
});
