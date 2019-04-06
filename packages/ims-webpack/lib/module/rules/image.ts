const imageOptions = {
    limit: 10000,
};
export default {
    test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
    loader: 'url-loader',
    options: imageOptions,
}