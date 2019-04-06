const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import postcssConfig from './postcss';
export default {
    test: /\.css$/,
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
    ],
}
