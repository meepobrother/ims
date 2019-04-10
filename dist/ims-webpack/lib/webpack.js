"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config = require("webpack-chain");
const path_1 = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const antd_1 = __importDefault(require("./plugins/antd"));
const autoprefixer = require("autoprefixer");
// import pxtransform = require('postcss-pxtransform');
const root = process.cwd();
const merge = require("webpack-merge");
const webpack_1 = require("webpack");
const libraryPath = path_1.join(root, 'template/library');
const coreManifest = require(path_1.join(libraryPath, 'core.manifest.json'));
const polyfillManifest = require(path_1.join(libraryPath, 'polyfill.manifest.json'));
const reactManifest = require(path_1.join(libraryPath, 'react.manifest.json'));
class ImsWebpack {
    constructor(dist, dev) {
        this.dist = dist;
        this.dev = dev;
        this.config = new Config();
        this.options = {};
        this.designWidth = 620;
        this.imageReg = /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/;
        this.fontReg = /\.(woff2?|eot|ttf|otf)(\?.*)?$/;
        this.mediaReg = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/;
        this.lessReg = /\.less\b/;
        this.sassReg = /\.(s[ac]ss)\b/;
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
        this.config.plugin('reactDll').use(webpack_1.DllReferencePlugin, [{
                manifest: reactManifest
            }]);
        this.config.plugin('polyfillDll').use(webpack_1.DllReferencePlugin, [{
                manifest: polyfillManifest
            }]);
        this.config.plugin('coreDll').use(webpack_1.DllReferencePlugin, [{
                manifest: coreManifest
            }]);
        this.entity = this.config.entry('app');
        this.initStyle();
    }
    get root() {
        return process.cwd();
    }
    getHtmlTemplate() {
        return path_1.join(__dirname, 'document.html');
    }
    initStyle() {
        const root = process.cwd();
        this.options = {
            mode: this.dev ? 'development' : 'production',
            devtool: this.dev ? 'source-map' : false,
            plugins: [],
            output: {
                path: path_1.join(this.root, 'template', this.dist),
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
                modules: [path_1.join(root, 'packages'), path_1.join(root, 'node_modules')]
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
                                        [antd_1.default, {
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
                        test: /\.jsx?$/,
                        enforce: 'pre',
                        use: [{
                                loader: 'babel-loader',
                                options: {
                                    babelrc: false,
                                    configFile: false,
                                    presets: ['@babel/preset-env', '@babel/preset-react'],
                                    plugins: [
                                        ['@babel/plugin-syntax-dynamic-import'],
                                        [antd_1.default, {
                                                "libraryName": "antd",
                                                "libraryDirectory": "es",
                                                "style": true // `style: true` 会加载 less 文件
                                            }]
                                    ]
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
        };
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
        ];
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
exports.ImsWebpack = ImsWebpack;
