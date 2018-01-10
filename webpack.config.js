const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('allstyles.css');

const clientBundleConfig = {
    devtool: 'source-map',
    entry: {
        'main': './ClientApp/client.js'
    },
    output: {
        path: __dirname + '/wwwroot/dist/',
        publicPath: '/dist/',
        filename: 'client.js'
    },
    plugins: [
        extractCSS,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/, use: extractCSS.extract(['css-loader?minimize'])
            },
            {
                test: /\.js?$/,
                use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } }

            }]
    }
};

const serverBundleConfig =
    {
        entry: { 'server': './ClientApp/server.js' },
        output: {
            libraryTarget: 'commonjs',
            path: __dirname + '/ClientApp/dist/',
            publicPath: '/ClientApp/dist/',
            filename: 'server.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/, use: extractCSS.extract(['css-loader?minimize'])
                },
                {
                    test: /\.js?$/,
                    use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } }

                }]
        },
        plugins: [
        ],
        target: 'node'
    };


module.exports = [clientBundleConfig, serverBundleConfig];