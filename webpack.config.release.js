// var webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: 'production',
    entry: [
        './src/js/Jaspen.js'
    ],
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: 'jaspen.min.js',
        library: 'jaspen',
        libraryTarget: 'umd'
    },
    //   externals: {
    //     three: {
    //       root: 'THREE',
    //       commonjs: 'three',
    //       commonjs2: 'three'
    //     },
    //     axios: 'axios'
    //   },
    watch: true,
    resolve: {
        extensions: ['.js', 'json']
    },
    module: {
        rules: [
            // {
            //   test: /\.js$/,
            //   exclude: /node_modules/,
            //   use: {
            //     loader: 'babel-loader'
            //   }
            // }
            // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
            // { test: /\.(t|j)s$/, use: { loader: 'awesome-typescript-loader' } },
            // addition - add source-map support
            // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
            //   { test: /\.(t|j)s$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }
            { test: /\.(t|j)s$/, exclude: /node_modules/ }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    ]
}
