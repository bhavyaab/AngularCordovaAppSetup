/// <binding BeforeBuild='Run - Development' />
'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CordovaPlugin = require('webpack-cordova-plugin');
dotenv.load();
const production = process.env.NODE_ENV === 'production';

let plugins = [
    new ExtractTextPlugin('css/bundle.css'),
    new HTMLPlugin({ template: `${__dirname}/app/index.html` }),
    new webpack.DefinePlugin({
        __API_URL__: JSON.stringify(process.env.API_URL),
        __DEBUG__: JSON.stringify(!production)
    }),
    new CordovaPlugin({
        output: 'www',
        config: `${__dirname}/config.xml`,  // Location of Cordova' config.xml (will be created if not found)
        index: `${__dirname}/app/index.html`,     // Set entry-point of cordova in config.xml
        platform: 'ios' || 'android',  // Set `webpack-dev-server` to correct `contentBase` to use Cordova plugins.
        version: true,         // Set config.xml' version. (true = use version from package.json)
    })
];

if (production) {
    plugins = plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: { warnings: false }
        }),
        new CleanPlugin()
    ]);
}

module.exports = {
    entry: `${__dirname}/app/entry.js`,
    devtool: production ? false : 'eval',
    output: {
        path: `${__dirname}/www`,
        filename: 'scripts/bundle.js'
    },
    plugins,
    sassLoader: { includePaths: [`${__dirname}/app/scss`] },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(woff|ttf|svg|eot).*/,
                loader: 'url?limit=10000&name=font/[hash].[ext]'
            },
            {
                test: /\.(jpg|jpeg|svg|bmp|tiff|gif|png)$/,
                loader: 'url?limit=10000&name=image/[hash].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
            }
        ]
    }
};

