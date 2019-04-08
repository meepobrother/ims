import Config = require('webpack-chain');
import { join } from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import DemoPlugin from './plugins/demoPlugin';
import AntdPlugin from './plugins/antd'
import autoprefixer = require('autoprefixer');
// import pxtransform = require('postcss-pxtransform');
const root = process.cwd();
import webpack = require('webpack');
import merge = require('webpack-merge');
import { DllReferencePlugin } from 'webpack';
const libraryPath = join(root, 'template/library')
const coreManifest = require(join(libraryPath, 'core.manifest.json'));
const polyfillManifest = require(join(libraryPath, 'polyfill.manifest.json'));
const reactManifest = require(join(libraryPath, 'react.manifest.json'));

export abstract class ImsWebpack {
    config: Config = new Config();
    options: webpack.Configuration = {};

    entity: Config.EntryPoint;
    designWidth: number = 620;
    get root() {
        return process.cwd();
    }
    imageReg = /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/;
    fontReg = /\.(woff2?|eot|ttf|otf)(\?.*)?$/;
    mediaReg = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/;
    lessReg = /\.less\b/;
    sassReg = /\.(s[ac]ss)\b/;

    constructor(public dist: string) {
        this.config.plugin('html').use(HtmlWebpackPlugin, [{
            template: this.getHtmlTemplate(),
            filename: 'index.html',
            // favicon: join(__dirname, 'favicon.png'),
            templateParameters: {
                title: '欢迎使用IMS应用框架',
                noscript: 'Sorry, we need js to run correctly!'
            },
            chunks: ['manifest', 'vendors', 'app', 'polyfill']
        }]);
        this.config.plugin('reactDll').use(DllReferencePlugin, [{
            manifest: reactManifest
        }]);
        this.config.plugin('polyfillDll').use(DllReferencePlugin, [{
            manifest: polyfillManifest
        }]);
        this.config.plugin('coreDll').use(DllReferencePlugin, [{
            manifest: coreManifest
        }]);
        this.entity = this.config.entry('app');
        this.initStyle();
    }

    getHtmlTemplate() {
        return join(__dirname, 'document.html')
    }

    initStyle() {
        const root = process.cwd();
        this.options = {
            plugins: [],
            output: {
                path: join(this.root, 'template', this.dist),
                publicPath: `/${this.dist}/`,
                filename: '[name]_[hash].bound.js',
                chunkFilename: '[name]_[hash].chunk.js'
            },
            externals: {
                moment: {
                    root: 'moment',
                    commonjs2: 'moment',
                    commonjs: 'moment',
                    amd: 'moment',
                }
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
                mainFields: ['main:h5', 'main', 'module'],
                symlinks: true,
                modules: [join(root, 'packages'), join(root, 'node_modules')]
            },
            module: {
                rules: [{
                    test: /\.tsx?$/,
                    enforce: 'pre',
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            configFile: false,
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                ['@babel/plugin-syntax-dynamic-import'],
                                [AntdPlugin, {
                                    "libraryName": "antd",
                                    "libraryDirectory": "es",
                                    "style": true // `style: true` 会加载 less 文件
                                }]
                            ]
                        }
                    }, {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: 'tsconfig.react.json'
                        }
                    }]
                }, {
                    test: /\.css$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: this.postCssPlugins
                        }
                    }]
                }, {
                    test: this.sassReg,
                    use: [{
                        loader: 'ims-typed-loader/lib/classnames'
                    }, {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'ims-typed-loader/lib/type'
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local]',
                            camelCase: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: this.postCssPlugins
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                }, {
                    test: this.lessReg,
                    use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    }, { loader: 'css-loader' }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: this.postCssPlugins
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                'primary-color': '#1890ff',
                                'link-color': '#1890ff',
                                'success-color': '#52c41a',
                                'warning-color': '#faad14',
                                'error-color': '#f5222d',
                                'font-size-base': '14px',
                                'heading-color': 'rgba(0, 0, 0, .85)',
                                'text-color': 'rgba(0, 0, 0, .65)',
                                'text-color-secondary': 'rgba(0, 0, 0, .45)',
                                'disabled-color': 'rgba(0, 0, 0, .25)',
                                'border-radius-base': '4px',
                                'border-color-base': '#d9d9d9',
                                'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)'
                            },
                            javascriptEnabled: true
                        }
                    }]
                }, {
                    test: this.mediaReg,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            name: 'assets/medias/[name]_[hash].[ext]',
                            limit: 10240
                        }
                    }]
                }, {
                    test: this.fontReg,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            name: 'assets/fonts/[name]_[hash].[ext]',
                            limit: 10240
                        }
                    }]
                }, {
                    test: this.imageReg,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            name: 'assets/images/[name]_[hash].[ext]',
                            limit: 10240
                        }
                    }]
                }]
            },
            performance: {
                hints: 'warning',
                maxEntrypointSize: 1700000,
                maxAssetSize: 1700000
            },
            optimization: {
                runtimeChunk: {
                    name: 'manifest'
                },
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors",
                            priority: -20,
                            chunks: "all"
                        }
                    }
                }
            }
        }
    }

    get postCssPlugins() {
        const plugins = [
            autoprefixer({
                browsers: [
                    'Android >= 4',
                    'iOS >= 6'
                ],
                flexbox: 'no-2009'
            })
        ]
        if (this.dist === 'mobile') {
            // plugins.push(pxtransform({
            //     designWidth: this.designWidth,
            //     deviceRatio: 1.0,
            //     platform: 'h5'
            // }));
        }
        return plugins;
    }

    toConfig() {
        return merge(this.options, this.config.toConfig());
    }
}
