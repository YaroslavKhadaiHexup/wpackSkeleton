const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // General config
    mode: "development",
    devtool: "source-map",
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
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    name: 'dist/[name].[ext]',
                    attrs: [':data-src', 'img:src'],
                    interpolate: true
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'src'
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
                loader: 'file-loader'
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
        // new HtmlWebpackPlugin({
        //     filename: 'notFound.html',
        //     template: 'src/templates/notFound.html'
        // })
    ]
};