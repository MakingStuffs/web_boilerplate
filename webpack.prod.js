
require('dotenv').config({path: './.env'});
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const postcssEnv = require('postcss-preset-env');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    entry: [
        '@babel/polyfill',
        './src/assets/js/main.js'
    ],
    module: {
        rules: [{
                test: /(?<!\.ce)\.scss$/,
                use: [{
                        loader: ExtractCssChunksPlugin.loader,
                        options: {
                            hot: false,
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
                                postcssEnv()
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
                test: /(\.ce\.scss)$/,
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [postcssEnv()],
                            sourceMap: 'inline'
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-transform-regenerator',
                            'transform-custom-element-classes',
                            '@babel/plugin-transform-classes'
                        ]
                    }
                }]
            },
            {
                test: /\.(svg|jpg|png|gif)$/,
                loaders: [{
                        loader: 'file-loader',
                        options: {
                            publicPath: `${process.env.DOMAIN}/assets/img/`,
                            outputPath: 'assets/img/',
                            filename: '[name].[hash].[ext]',
                            esModule: false
                        },
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: path.resolve(__dirname, '/assets/fonts'),
                        outputPath: 'assets/fonts',
                        filename: '[name].[ext]',
                        esModule: false
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.DOMAIN,
        filename: 'assets/js/[name].[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!ejs-webpack-loader!src/views/pages/index.ejs',
            filename: 'index.html',
            minify: true,
            favicon: 'src/assets/img/favicon.ico'
        }),
        new ExtractCssChunksPlugin({
            filename: 'assets/css/[name].[hash].css',
            chunkFilename: 'assets/css/[id].css'
        })
    ]
});