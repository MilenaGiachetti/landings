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

const pages = populateHtmlPlugins(["test"]);

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/script.js'),
        test: path.resolve(__dirname, '../src/pages/test/script.js')
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true,
            // base: isProduction ? '/landings/' : '/',
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
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.s[ac]ss$/i,
                use:
                [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
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
