import { resolve } from './util'
export default (babelConfig: any) => {
    return {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: resolve('babel-loader'),
        options: babelConfig,
    }
}
