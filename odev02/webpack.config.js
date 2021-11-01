const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
module.exports={
    entry: './src/kod.js',
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname,'./public/'),
        libraryTarget: "var",
        library: "catt"
    },
    devServer: {
        static: './public'

    },
    module: {
        rules: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                loader: 'image-webpack-loader',
                //type: './public/imgs/cat.jpg',
                }
            ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
            extractComments: false
        })]
    }
}