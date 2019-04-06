const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import { resolve } from './util'
import postcssConfig from './postcss'
export default {
    test: /\.less$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'postcss-loader',
            options: Object.assign({}, postcssConfig, { sourceMap: true }),
        },
        {
            loader: resolve('less-loader'),
            options: {
                javascriptEnabled: true,
                sourceMap: true,
            },
        },
    ],
}