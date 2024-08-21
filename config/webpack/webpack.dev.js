// const config = require('../webpack.config');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common(), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'dist'),
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true,
            },
        },
        hot: true,
        client: {
            logging: 'info',
            overlay: {errors: true, warnings: false},
        },
        host: '127.0.0.1',
        port: 3000,
    },
});
