const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'messenger.bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: 'file-loader',
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: 'file-loader',
            },
            {
                test: /\.hbs$/,
                loader: 'raw-loader',
            },
        ],
    },
    resolve: {
        plugins: [
            new TsconfigPathsPlugin(),
        ],
        extensions: ['.ts', '.js', '.json', '.html'],
        alias: {
            handlebars: 'handlebars/dist/cjs/handlebars',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
};
