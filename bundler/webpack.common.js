const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const isProduction = process.env.npm_lifecycle_event != "dev";

const generateHtmlPlugin = (title) => {
    return new HtmlWebpackPlugin({
        title,
        filename: `pages/${title.toLowerCase()}/index.html`,
        template: `./src/pages/${title.toLowerCase()}/index.html`,
        // base: isProduction ? '/landings/' : '/',
        inject: true,
        chunks: [title]
    });
}

const populateHtmlPlugins = (pagesArray) => {
    res = [];
    pagesArray.forEach(page => {
        res.push(generateHtmlPlugin(page));
    })
    return res;
}

const pages = populateHtmlPlugins(["room_homepage", "svg_animation", "text", "add_model"]);

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/script.js'),
        room_homepage: path.resolve(__dirname, '../src/pages/room_homepage/script.js'),
        svg_animation: path.resolve(__dirname, '../src/pages/svg_animation/script.js'),
        add_model: path.resolve(__dirname, '../src/pages/add_model/script.js'),
        text: path.resolve(__dirname, '../src/pages/text/script.js')
    },
    output: {
        publicPath: isProduction ? '/landings/' : '/',
        filename: '[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname, '../static') }
        //     ]
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true,
            base: isProduction ? '/landings/' : '/',
            inject: true,
            chunks: ['index']
        }),
        ...pages
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                }
                            ]
                        ],
                        plugins: [
                            require("@babel/plugin-transform-async-to-generator"),
                            require("@babel/plugin-transform-arrow-functions"),
                            require("@babel/plugin-transform-modules-commonjs")
                        ]
                    }
                }
            },

            // CSS
            {
                test: /\.s[ac]ss$/i,
                use:
                [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-preset-env')({
                                        browsers: 'last 2 versions',
                                        autoprefixer: { grid: 'autoplace' }
                                    }),
                                ],
                            },
                        }
                    },
                    {
                        loader: 'sass-loader', 
                        options: { 
                            sourceMap: true 
                        }
                    }
                ]
            },

            // Images
            // {
            //     test: /\.(jpg|png|gif|svg)$/,
            //     use:
            //     [
            //         {
            //             loader: 'file-loader',
            //             options:
            //             {
            //                 outputPath: 'assets/images/'
            //             }
            //         }
            //     ]
            // },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },
        ]
    }
}
