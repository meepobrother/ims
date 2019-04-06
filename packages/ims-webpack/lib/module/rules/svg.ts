const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
    limit: 10000,
    minetype: 'image/svg+xml',
};
export default {
    test: svgRegex,
    loader: 'url-loader',
    options: svgOptions,
}
