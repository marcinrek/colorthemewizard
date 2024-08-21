// const config = require('../webpack.config');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const appVersion = require('../../package.json').version;
const handlebarsHelpers = require('../../src/common/js/hbsHelpers');
const aliases = require('../aliases');

module.exports = (env) => {
    const isProduction = env?.production === true ?? false;
    const envFilePath = isProduction ? '.env' : '.env.development';
    console.log('Production build:', isProduction);
    console.log('App version:', appVersion);

    return {
        // entry: {
        //     index: [path.resolve(__dirname, '../../src/index.js')],
        // },
        output: {
            path: path.resolve(__dirname, `../../dist/`),
            clean: true,
            filename: 'assets/js/[name].js',
            chunkFilename: 'assets/js/chunks/[name].js',
        },
        resolve: {
            alias: aliases,
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    use: ['css-loader', 'postcss-loader', 'sass-loader', 'glob-import-loader'],
                },
                {
                    // test: /\.jsx?$/,
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.(ico|png|jp?g|webp|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/img/[name][ext][query]',
                    },
                },
            ],
        },
        plugins: [
            new Dotenv({
                path: envFilePath,
            }),
            new ESLintPlugin({extensions: ['js', 'jsx']}),
            new CopyPlugin({
                patterns: [
                    {from: 'src/components/**/images/*.*', to: 'assets/img/[name][ext]', noErrorOnMissing: true},
                    {from: 'src/assets/*.*', to: 'assets/[name][ext]', noErrorOnMissing: true},
                    {from: 'src/rootFolder/*.*', to: '[name][ext]', noErrorOnMissing: true},
                ],
            }),
            new HtmlBundlerPlugin({
                entry: './src/pages',
                data: './src/pages/pagesData.json',
                hotUpdate: true,
                preprocessor: 'handlebars',
                preprocessorOptions: {
                    partials: ['src/components', 'src/common'],
                    helpers: handlebarsHelpers,
                },
                css: {
                    filename: 'assets/css/[name].css',
                },
            }),
        ],
        optimization: {
            // runtimeChunk: 'single',
            // splitChunks: {
            //     cacheGroups: {
            //         vendor: {
            //             test: /[\\/]node_modules|common[\\/].+\.(js|ts)$/,
            //             name: 'vendor',
            //             chunks: 'all',
            //         },
            //     },
            // },
        },
    };
};
