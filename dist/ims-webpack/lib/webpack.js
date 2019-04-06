"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Config = require("webpack-chain");
const path_1 = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const demoPlugin_1 = tslib_1.__importDefault(require("./plugins/demoPlugin"));
const antd_1 = tslib_1.__importDefault(require("./plugins/antd"));
const autoprefixer = require("autoprefixer");
// import pxtransform = require('postcss-pxtransform');
const root = process.cwd();
const merge = require("webpack-merge");
const webpack_1 = require("webpack");
const size = require(path_1.join(process.cwd(), 'config', 'size.json'));
const libraryPath = path_1.join(root, 'template/library');
const coreManifest = require(path_1.join(libraryPath, 'core.manifest.json'));
const polyfillManifest = require(path_1.join(libraryPath, 'polyfill.manifest.json'));
const reactManifest = require(path_1.join(libraryPath, 'react.manifest.json'));
class ImsWebpack {
    constructor(dist) {
        this.dist = dist;
        this.config = new Config();
        this.options = {};
        this.designWidth = 620;
        this.imageReg = /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/;
        this.fontReg = /\.(woff2?|eot|ttf|otf)(\?.*)?$/;
        this.mediaReg = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/;
        this.lessReg = /\.less\b/;
        this.sassReg = /\.(s[ac]ss)\b/;
        if (this.dist === 'admin') {
            this.designWidth = size.admin.designWidth;
        }
        else if (this.dist === 'mobile') {
            this.designWidth = size.mobile.designWidth;
        }
        this.config.mode('production');
        this.config.plugin('html').use(HtmlWebpackPlugin, [{
                template: this.getHtmlTemplate(),
                filename: 'index.html',
                // favicon: join(__dirname, 'favicon.png'),
                templateParameters: {
                    title: 'Ant Design Pro',
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
            output: {
                path: path_1.join(this.root, 'template', this.dist),
                publicPath: `/${this.dist}/`,
                filename: '[name]_[hash].bound.js',
                chunkFilename: '[name]_[hash].chunk.js'
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
                                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                                    plugins: [
                                        'babel-plugin-macros',
                                        ['@babel/plugin-transform-destructuring', {
                                                loose: false,
                                                selectiveLoose: [
                                                    'useState',
                                                    'useEffect',
                                                    'useContext',
                                                    'useReducer',
                                                    'useCallback',
                                                    'useMemo',
                                                    'useRef',
                                                    'useImperativeHandle',
                                                    'useLayoutEffect',
                                                    'useDebugValue',
                                                ],
                                            }],
                                        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
                                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                                        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
                                        ['@babel/plugin-transform-runtime', {
                                                corejs: false,
                                                helpers: true,
                                                regenerator: true,
                                                useESModules: true,
                                            }],
                                        '@babel/plugin-syntax-dynamic-import',
                                        [antd_1.default, {
                                                "libraryName": "antd",
                                                "libraryDirectory": "es",
                                                "style": "css" // `style: true` 会加载 less 文件
                                            }],
                                        [demoPlugin_1.default]
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
                                loader: 'less-loader'
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
