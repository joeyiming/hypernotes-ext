import path from "path";
import { Configuration } from "webpack";

const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const manifest = require('./src/manifest.json');

const config: Configuration = {
  entry: {
    index: "./src/index.ts",
    contentScript: "./src/content.ts",
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watch: true,
  stats: {
    errorDetails: true,
    children: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    clean: true
  },
  plugins: [
    new GenerateJsonPlugin('manifest.json', manifest),
    new CopyPlugin({
      patterns: [
        {from: 'src/images', to: 'images'}
      ]
    })
  ]
};

export default config;