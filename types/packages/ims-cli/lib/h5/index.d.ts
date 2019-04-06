import fs = require('fs-extra');
export interface CopyOptions {
    patterns: {
        from: string;
        to: string;
        ignore: string[];
    }[];
    options: {
        ignore?: string[];
    };
}
export declare class ImsH5 {
    outputPath: string;
    copy: CopyOptions;
    appPath: string;
    tempPath: string;
    sourcePath: string;
    clean(): Promise<void>;
    copyFileSync(from: string, to: string, options: fs.CopyOptionsSync): void;
    copyFiles(): void;
    getDist(filename: string, isScriptFile: boolean): string;
    REG_SCRIPTS: RegExp;
    processFiles(filePath: string): void;
    buildTemp(): Promise<{}>;
    build(): Promise<void>;
}
