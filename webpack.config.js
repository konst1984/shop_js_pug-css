const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const webpack = require("webpack");
const path =require('path');

const pages = ["index", "category", 'cart', 'checkout', 'product'];

module.exports = (env) => {
    let mode = env.mode || "development";
    const isDev = mode === "development";
    const PORT = env.port || 3010;

    if (env.mode === "production") {
        mode = "production";
    }

    return {
        mode,
        entry: {
            index:[
              path.resolve(__dirname, "src", 'index.js'),
              path.resolve(__dirname, 'src','js/pages/common.js'),
            ],
            category:[
                path.resolve(__dirname, "src", 'category.js'),
                path.resolve(__dirname, 'src','js/pages/common.js'),
            ],
            cart:[
                path.resolve(__dirname, "src", 'cart.js'),
                path.resolve(__dirname, 'src','js/pages/common.js'),
            ],
            checkout:[
                path.resolve(__dirname, "src", 'checkout.js'),
                path.resolve(__dirname, 'src','js/pages/common.js'),
            ],
            product:[
                path.resolve(__dirname, "src", 'product.js'),
                path.resolve(__dirname, 'src','js/pages/common.js'),
            ]
        },
        devtool: isDev ? "inline-source-map" : undefined,
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devServer: isDev
          ? {
              port: PORT,
              open: true,
          }
          : undefined,
        output: {
            filename: "[name].bundle.js",
            assetModuleFilename: "images/[hash][ext][query]",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        plugins: [
            new webpack.ProgressPlugin(),
            ...pages.map((page) => (
              new HtmlWebpackPlugin({
                  filename: `${page}.html`,
                  template: path.resolve(__dirname, "src", `pug/pages/${page}.pug`),
                  chunks: [page]
              })
            )),
            new StylelintPlugin({
                configFile: ".stylelintrc.json",
                context: "src",
                files: "**/*.css",
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.css$/,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    exclude: /(node_modules|bower_components)/,
                },
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }]
                            ]
                        }
                    }
                }
            ],
        },
    };
};
