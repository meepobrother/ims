import { resolve } from './util'
export default (babelConfig: any) => {
    return {
        test: /\.tsx?$/,
        use: [
            {
                loader: resolve('babel-loader'),
                options: babelConfig,
            },
            {
                loader: resolve('ts-loader'),
                options: {
                    transpileOnly: true,
                },
            },
        ],
    }
}