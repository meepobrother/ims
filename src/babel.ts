import { traverse, parseSync, TransformOptions } from '@babel/core'
import generator from '@babel/generator'
import { NodePath } from '@babel/traverse'
import * as t from '@babel/types'
import { join, relative } from 'path';
import { watch } from 'chokidar';
import fs from 'fs-extra';
import rimraf = require('rimraf');
import { transpileModule, JsxEmit, ScriptTarget } from 'typescript'
const root = process.cwd();
import { JsxElement } from './babel/jsxElement'
import BabelDemo from './babel/demo'
export class ImsBabel {
    constructor(public sourceRoot: string, public dest: string) { }
    bootstrap() {
        console.log(`ims babel bootstrap`)
        rimraf(this.dest, () => {
            const watcher = watch(this.sourceRoot, {});
            watcher.on('add', this.onAdd.bind(this))
            watcher.on('addDir', this.onAddDir.bind(this))
            watcher.on('change', this.onChange.bind(this))
            watcher.on('unlink', this.onUnLink.bind(this))
            watcher.on('unlinkDir', this.onUnlinkDir.bind(this))
        });
    }
    parse(code: string, options?: TransformOptions) {
        const res = transpileModule(code, {
            compilerOptions: {
                jsx: JsxEmit.Preserve,
                target: ScriptTarget.ESNext,
                importHelpers: true,
                noEmitHelpers: true
            }
        })
        console.log(BabelDemo)
        const ast = parseSync(res.outputText, {
            babelrc: false,
            configFile: false,
            parserOpts: {
                sourceType: 'module',
                plugins: [
                    'jsx',
                    'classProperties',
                    'classPrivateMethods',
                    'classPrivateProperties',
                    'exportNamespaceFrom',
                    'throwExpressions',
                    'asyncGenerators',
                    'objectRestSpread',
                    'dynamicImport'
                ]
            },
            plugins: [
                BabelDemo
            ]
        });
        return generator(ast).code;
    }

    listenFile(path: string, stats?: fs.Stats) {
        if (path.endsWith('.tsx')) {
            const content = fs.readFileSync(path).toString('utf8');
            let filePath = this.createDestPath(path);
            filePath = filePath.replace('.tsx', '.jsx')
            fs.writeFileSync(filePath, this.parse(content))
        }
        else if (path.endsWith('.ts')) {
            const content = fs.readFileSync(path).toString('utf8');
            let filePath = this.createDestPath(path);
            filePath = filePath.replace('.ts', '.jsx')
            fs.writeFileSync(filePath, this.parse(content))
        } else {
            console.log(path)
        }
    }
    createDestPath(path: string): string {
        return join(this.dest, path.replace(this.sourceRoot, ''))
    }
    /** 文件变更 */
    onChange(path: string, stats?: fs.Stats) {
        this.listenFile(path, stats)
    }
    /** 添加文件 */
    onAdd(path: string, stats?: fs.Stats) {
        this.listenFile(path, stats)
    }
    /** 添加文件夹 */
    onAddDir(path: string, stats?: fs.Stats) {
        fs.ensureDirSync(this.createDestPath(path))
    }
    /** 删除文件 */
    onUnLink(path: string) {
        const filePath = this.createDestPath(path)
        fs.removeSync(filePath);
    }
    /** 删除文件夹 */
    onUnlinkDir(path: string) {
        const filePath = this.createDestPath(path)
        fs.rmdirSync(filePath);
    }
}

const babel = new ImsBabel(join(__dirname, 'test'), join(__dirname, 'dist'))
babel.bootstrap();