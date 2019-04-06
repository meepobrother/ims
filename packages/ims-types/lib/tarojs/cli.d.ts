declare module '@tarojs/cli/src/build' {
    type BuildType = 'weapp' | 'h5' | 'rn' | 'swan' | 'alipay' | 'tt' | 'ui' | string;
    function build(args: string[], buildConfig: { type: BuildType, watch: boolean }): void;
    export = build;
}