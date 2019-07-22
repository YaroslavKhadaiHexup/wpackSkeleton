const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let conf = {
    // General config
    entry: {
        main: [
            './src/scripts/index.js',
            './src/styles/index.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./main.js"
    },
    resolve: {
        alias: {
            'img': '../src/assets/img',
            'assets': '../src/assets',
            'icons': '../src/assets/icons',
            '@': '../src/scripts', //excessive
            'styles': '../src/styles'
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    name: 'dist/[name].[ext]',
                    attrs: [':data-src', 'img:src'],
                    interpolate: true
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.svg$/,
                exclude: [
                    path.resolve(__dirname, "src/assets/background")
                ],
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'src'
                }
            },
            {
                test: /\.(woff|woff2|eot|otf|ttf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.mp4$/,
                loader: 'file-loader',
                options: {
                    name: './assets/video/[name].[ext]'
                }
            }

        ]
    },
    devServer: {
        contentBase: "./dist",
        compress: true,
        clientLogLevel: 'error',
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/templates/index.html'
        })
        // add new page
        // new HtmlWebpackPlugin({
        //     filename: 'notFound.html',
        //     template: 'src/templates/notFound.html'
        // })
    ]
};
module.exports = (env, options) => {
    let production = options.mode === 'production';

    if (production) {
        conf.module.rules.push(
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: loader => [
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 11',
                                    ],
                                    remove: false
                                })
                            ]
                        }
                    },
            {
                loader: 'sass-loader',
                options: {
                    outputStyle: 'compressed'
                }
            }
                ]
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, "src/assets/background")
                ],
                loader: 'file-loader',
                options: {
                    name: './assets/background/[name].[ext]'
                }
            },
        );
        conf.plugins.push(
            new MiniCssExtractPlugin({}),
            new OptimizeCSSAssetsPlugin({}),
        );
    } else {
            conf.devtool = "eval-sourcemap";
            conf.module.rules.push(
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 11',
                                    ],
                                    remove: false
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, "src/assets/background")
                ],
                loader: 'file-loader'
            },
        );
    }
    return conf;
};