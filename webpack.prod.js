const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    // General config
    mode: 'production',
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
            'assets': '../src/assets',
            'img': '../src/assets/img',
            'media': '../src/assets/media',
            '@': '../src/scripts',
            'styles': '../src/styles'
        }
    },
    module: {
        rules: [
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
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'compressed'
                        }
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
                    }
                ]
            },
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
                test: /\.svg$/,
                    include: [
                path.resolve(__dirname, "src/assets/background")
            ],
                loader: 'file-loader',
                options: {
                name: './assets/background/[name].[ext]'
            }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                loader: "file-loader?name=[path][name].[ext]&context=src"
            },
            {
                test: /\.(woff|woff2|eot|otf|ttf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './assets/fonts/[name].[ext]'
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
        new MiniCssExtractPlugin({}),
        new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/templates/index.html'
        })
        // new HtmlWebpackPlugin({
        //     filename: 'notFound.html',
        //     template: 'src/templates/notFound.html'
        // })
    ],
};