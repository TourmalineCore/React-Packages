const path = require('path');

module.exports = {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
    "storybook-addon-react-docgen"
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    }
  },
  webpackFinal: (config) => {
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.module.rules.find(
      rule => rule.test.toString() === '/\\.css$/',
    ).exclude = /\.module\.css$/;

    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[local]--[hash:base64:5]',
            },
          }
        }
      ],
      exclude: /node_modules/,
    });

    return { ...config, resolve: { ...config.resolve, mainFields: ["source", "module", "main"] } };
  },
}
