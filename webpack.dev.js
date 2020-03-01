const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const webpack = require('webpack')
const postCssPresetEnv = require('postcss-preset-env');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        './src/assets/js/main.js',
        'webpack-hot-middleware/client',
        '@babel/polyfill'
    ],
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: '/node_modules/',
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-transform-regenerator',
                        'transform-custom-element-classes',
                        '@babel/plugin-transform-classes'
                    ]
                }
            },
            {
                test: /(?<!\.ce)\.scss$/,
                use: [{
                        loader: ExtractCssChunksPlugin.loader,
                        options: {
                            hot: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 3
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postCssPresetEnv()
                            ],
                            sourceMap: 'inline'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use :['ejs-compiled-loader']
            },
            {
                test: /(\.ce\.scss)$/,
                use :[
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [ postcssPresetEnv() ],
                            sourceMap: 'inline'
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/views/pages/index.ejs',
            filename: 'index.html'
        }),
        new ExtractCssChunksPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});