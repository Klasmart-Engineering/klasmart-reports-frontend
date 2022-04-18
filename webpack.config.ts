import "webpack-dev-server";
import pkg from "./package.json";
import { execSync } from "child_process";
import DotEnv from "dotenv-webpack";
import path from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const webpackConfig = (env: any, args: any): webpack.Configuration => ({
    mode: env.mode === `development` ? 'development' : 'production',
    devtool: env.mode === `development` ? `eval-cheap-module-source-map` : `source-map`,
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, `dist`),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules|(\.test\.|\.stories\.)/,
                use: {
                    loader: `babel-loader`,
                },
            },
            {
                test: /\.css$/i,
                use: [ `style-loader`, `css-loader` ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    `file-loader`,
                    {
                        loader: `image-webpack-loader`,
                        options: {
                            pngquant: {
                                quality: [ 0.65, 0.90 ],
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ `file-loader` ],
            },
            {
                test: /\.mp4$/,
                use: `file-loader?name=videos/[name].[ext]`,
            },
        ],
    },
    resolve: {
        extensions: [
            `.js`,
            `.jsx`,
            `.tsx`,
            `.ts`,
        ],
        alias: {
            '@': path.resolve(__dirname, `src`),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.container.ModuleFederationPlugin({
            "name": "reports",
            exposes: {
                "./AboutPage": "@/pages/about",
                "./List": "@/components/List",
                "./ListItem": "@/components/ListItem"
            },
            remotes: {
                reports: `reports@${process.env.REPORTS_DOMAIN_URL}/remoteEntry.js`,
            },
            shared: {
                ...pkg.dependencies,
                react: {
                    eager: true,
                    singleton: true,
                    requiredVersion: pkg.dependencies['react'],
                },
                'react-dom': {
                    eager: true,
                    singleton: true,
                    requiredVersion: pkg.dependencies['react-dom'],
                }
            },
        }),
        new webpack.EnvironmentPlugin({
            VERSION: pkg.version,
            GIT_COMMIT: execSync(`git rev-parse HEAD`).toString().trim().slice(0, 7),
        }),
        new DotEnv(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `public`,
                    to: ``, // not `dist` as it will then be placed at `dist/dist`
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: `src/index.html`,
        }),
    ],
    devServer: {
        host: `fe.alpha.kidsloop.net`,
        port: 8080,
        https: true,
        historyApiFallback: true,
    },
});

export default webpackConfig;
