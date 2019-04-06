import rimraf = require('rimraf');
import path = require('path');
import fs = require('fs-extra');
import minimatch = require('minimatch');
import klaw = require('klaw')
import { promisify } from 'util';
const pRimraf = promisify(rimraf);
export interface CopyOptions {
    patterns: { from: string, to: string, ignore: string[] }[];
    options: { ignore?: string[] };
}
export class ImsH5 {
    outputPath: string;
    copy: CopyOptions;
    appPath: string;
    tempPath: string;
    sourcePath: string;
    async clean() {
        try {
            await pRimraf(this.tempPath)
            await pRimraf(this.outputPath)
        } catch (e) {
            console.log(e)
        }
    }
    copyFileSync(from: string, to: string, options: fs.CopyOptionsSync) {
        const filename = path.basename(from)
        if (fs.statSync(from).isFile() && !path.extname(to)) {
            fs.ensureDir(to)
            return fs.copySync(from, path.join(to, filename), options)
        }
        fs.ensureDir(path.dirname(to))
        return fs.copySync(from, to, options)
    }
    copyFiles() {
        const copyConfig: CopyOptions = this.copy || { patterns: [], options: {} }
        if (copyConfig.patterns && copyConfig.patterns.length) {
            copyConfig.options = copyConfig.options || {}
            const globalIgnore = copyConfig.options.ignore;
            const projectDir = this.appPath;
            copyConfig.patterns.forEach(pattern => {
                if (typeof pattern === 'object' && pattern.from && pattern.to) {
                    const from = path.join(projectDir, pattern.from)
                    const to = path.join(projectDir, pattern.to)
                    let ignore = pattern.ignore || globalIgnore
                    if (fs.existsSync(from)) {
                        const copyOptions: fs.CopyOptionsSync = {}
                        if (ignore) {
                            ignore = Array.isArray(ignore) ? ignore : [ignore]
                            copyOptions.filter = src => {
                                let isMatch = false
                                ignore.forEach(iPa => {
                                    if (minimatch(path.basename(src), iPa)) {
                                        isMatch = true
                                    }
                                });
                                return !isMatch
                            }
                        }
                        this.copyFileSync(from, to, copyOptions)
                    }
                }
            })
        }
    }

    getDist(filename: string, isScriptFile: boolean) {
        const dirname = path.dirname(filename)
        const distDirname = dirname.replace(this.sourcePath, this.tempPath)
        return isScriptFile
            ? path.format({
                dir: distDirname,
                ext: '.js',
                name: path.basename(filename, path.extname(filename))
            })
            : path.format({
                dir: distDirname,
                base: path.basename(filename)
            })
    }

    REG_SCRIPTS = /\.[tj]sx?$/i

    processFiles(filePath: string) {
        const file = fs.readFileSync(filePath)
        const dirname = path.dirname(filePath)
        const extname = path.extname(filePath)
        const distDirname = dirname.replace(this.sourcePath, this.tempPath)
        const isScriptFile = this.REG_SCRIPTS.test(extname);
        const distPath = this.getDist(filePath, isScriptFile)
        try {
            if (isScriptFile) {
                // 脚本文件 处理一下
                const content = file.toString()
                // 处理文件
                const jsCode = content;
                fs.ensureDirSync(distDirname)
                fs.writeFileSync(distPath, Buffer.from(jsCode))
            } else {
                // 其他 直接复制
                fs.ensureDirSync(distDirname)
                fs.copySync(filePath, distPath)
            }
        } catch (e) {
            console.log(e)
        }
    }

    buildTemp() {
        fs.ensureDirSync(this.tempPath)
        return new Promise((resolve, reject) => {
            klaw(this.sourcePath)
                .on('data', file => {
                    const relativePath = path.relative(this.appPath, file.path)
                    if (!file.stats.isDirectory()) {
                        console.log('发现文件', relativePath)
                        this.processFiles(file.path)
                    }
                })
                .on('end', () => {
                    resolve()
                })
        })
    }

    async build() {
        await this.clean()
        this.copyFiles()
        await this.buildTemp()
    }
}