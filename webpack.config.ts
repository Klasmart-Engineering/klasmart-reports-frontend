import "webpack-dev-server";
import pkg from "./package.json";
import { execSync } from "child_process";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import DotEnv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

const webpackConfig = (env: any, args: any): webpack.Configuration => ({
    mode: `production`,
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
            name: `reports`,
            filename: `remoteEntry.js`,
            exposes: {
                "./LearningOutcomeSummary": `@/components/StudentDashboard/LearningOutcomeSummary`,
                "./Completion": `@/components/StudentDashboard/Completion`,
                "./Achievement": `@/components/StudentDashboard/Achievement`,
                "./StudentAttendance": `@/components/StudentDashboard/StudentAttendance`,
                "./AdaptiveLearning": `@/components/StudentDashboard/AdaptiveLearning`,
                "./AdaptiveLearningJourney": `@/components/StudentDashboard/AdaptiveLearningJourney`,
                "./AttendanceRate": `@/components/TeacherDashboard/AttendanceRate`,
                "./ContentStatus": `@/components/TeacherDashboard/ContentStatus`,
                "./TeacherLoad": `@/components/TeacherDashboard/TeacherLoadWidget`,
                "./PendingAssessments": `@/components/TeacherDashboard/PendingAssessments`,
            },
            shared : {
                react: {
                    singleton: true,
                    requiredVersion: pkg.dependencies[`react`],
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: pkg.dependencies[`react-dom`],
                },
                'react-cookie': {
                    singleton: true,
                },
                'react-intl': {
                    singleton: true,
                    requiredVersion: pkg.dependencies[`react-intl`],
                },
                '@mui/icons-material': {
                    singleton: true,
                },
                '@mui/lab': {
                    singleton: true,
                },
                '@mui/material': {
                    singleton: true,
                    requiredVersion: pkg.dependencies[`@mui/material`],
                },
                '@mui/styles': {
                    singleton: true,
                },
                '@kl-engineering/reports-api-client': {
                    singleton: true,
                },
                '@kl-engineering/cms-api-client': {
                    singleton: true,
                },
                '@kl-engineering/kidsloop-px': {
                    singleton: true,
                },
                '@kl-engineering/frontend-state': {
                    singleton: true,
                    requiredVersion: pkg.dependencies[`@kl-engineering/frontend-state`],
                },
                lodash: {
                    singleton: true,
                },
                '@emotion/styled': {
                    singleton: true,
                    requiredVersion: pkg.dependencies[`@emotion/styled`],
                },
                '@emotion/react': {
                    singleton: true,
                    requiredVersion: pkg.dependencies[`@emotion/react`],
                },
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
