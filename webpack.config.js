const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const root = process.cwd();
const rimraf = require('rimraf');
rimraf(path.join(root, 'template/library'), () => { });
module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
        core: ['ims-core', 'lodash'],
        antd: ['antd'],
        polyfill: ['@babel/polyfill'],
        bizcharts: ['bizcharts'],
        dataSet: ['@antv/data-set'],
        antDesignIcons: ['@ant-design/icons'],
        moment: ['moment']
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        mainFields: ['main:h5', 'main', 'module'],
        symlinks: true,
        modules: [path.join(root, 'packages'), path.join(root, 'node_modules')]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(root, 'template/library'),
        library: '_dll_[name]',  //dll的全局变量名
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-transform-react-jsx',
                        "@babel/plugin-syntax-import-meta",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        "@babel/plugin-proposal-json-strings"
                    ]
                }
            }]
        }]
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',  //dll的全局变量名
            path: path.join(root, 'template/library', '[name].manifest.json'),//描述生成的manifest文件
        })
    ]
}
