const path = require('path')
const html = require('html-webpack-plugin')
const clean = require('clean-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', './src/client/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            }
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:4000'
        },
        historyApiFallback: true
    },
    plugins: [
        new clean(['dist']),
        new html({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        })
    ]
}



// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

// const outputDirectory = 'dist';

// module.exports = {
//   entry: ['babel-polyfill', './src/client/index.js'],
//   output: {
//     path: path.join(__dirname, outputDirectory),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         }
//       },

//     ]
//   },
//   devServer: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/api': 'http://localhost:8080'
//     }
//   },
//   plugins: [
//     new CleanWebpackPlugin([outputDirectory]),
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//       favicon: './public/favicon.ico'
//     })
//   ]
// };
