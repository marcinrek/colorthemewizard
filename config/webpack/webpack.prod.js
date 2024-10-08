// const config = require('../webpack.config');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => {
    return merge(common(env), {
        mode: 'production',
        devtool: 'source-map',
        plugins: [],
        optimization: {
            minimize: true,
        },
    });
};
