/// <reference types="node" />
import { TransformOptions } from '@babel/core';
import fs from 'fs-extra';
export declare class ImsBabel {
    sourceRoot: string;
    dest: string;
    constructor(sourceRoot: string, dest: string);
    bootstrap(): void;
    parse(code: string, options?: TransformOptions): string;
    listenFile(path: string, stats?: fs.Stats): void;
    createDestPath(path: string): string;
    /** 文件变更 */
    onChange(path: string, stats?: fs.Stats): void;
    /** 添加文件 */
    onAdd(path: string, stats?: fs.Stats): void;
    /** 添加文件夹 */
    onAddDir(path: string, stats?: fs.Stats): void;
    /** 删除文件 */
    onUnLink(path: string): void;
    /** 删除文件夹 */
    onUnlinkDir(path: string): void;
}
