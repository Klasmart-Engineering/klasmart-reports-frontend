const path = require('path');
const webpack = require('webpack');
const pkg = require("../package.json");
const { execSync } = require("child_process");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  "framework": "@storybook/react",
  "core": {
      "builder": "webpack5"
  },
  webpackFinal: async (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin({
          VERSION: pkg.version,
          GIT_COMMIT: execSync(`git rev-parse HEAD`).toString().trim().slice(0, 7),
      })
    );
    // config.plugins.push(
    //   new webpack.container.ModuleFederationPlugin({
    //     "name": "mfe",
    //     "exposes": {
    //         "./AboutPage": "@/pages/about",
    //         "./List": "@/components/List",
    //         "./ListItem": "@/components/ListItem"
    //     },
    //     remotes: {
    //         mfe: `mfe@${process.env.REPORTS_DOMAIN_URL}/mfe.js`,
    //     },
    //     shared: {
    //         ...pkg.dependencies,
    //         react: {
    //             eager: true,
    //             singleton: true,
    //             requiredVersion: pkg.dependencies['react'],
    //         },
    //         'react-dom': {
    //             eager: true,
    //             singleton: true,
    //             requiredVersion: pkg.dependencies['react-dom'],
    //         },
    //     },
    //   })
    // );
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(__dirname, '../src/'),
        },
      },
    };
  },
}
