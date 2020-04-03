require('dotenv').config({path: './.env'});
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const postCssPresetEnv = require('postcss-preset-env');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        '@babel/polyfill',
        './src/assets/js/main.js'
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
                test: /(\.ce\.scss)$/,
                use :[
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [ postCssPresetEnv() ],
                            sourceMap: 'inline'
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.ico$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: path.resolve(__dirname, '/'),
                            outputPath: '',
                            name: '[name].[ext]',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: path.resolve(__dirname, '/assets/img/'),
                            outputPath: 'assets/img',
                            name: '[name].[hash].[ext]',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: path.resolve(__dirname, '/assets/fonts/'),
                            outputPath: 'assets/fonts',
                            name: '[name].[hash].[ext]',
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'ejs-webpack-loader!src/views/pages/index.ejs',
            filename: 'index.html',
            domain: process.env.DOMAIN
        }),
        new ExtractCssChunksPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css'
        }),
        new BrowserSyncPlugin({
            files: '**/*.ejs',
            proxy: `https://localhost:${process.env.PORT}`
        })
    ]
});