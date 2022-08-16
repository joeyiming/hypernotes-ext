import path from "path";
import { Configuration } from "webpack";

const CopyPlugin = require('copy-webpack-plugin');

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
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["to-string-loader", "css-loader"],
      },
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
    new CopyPlugin({
      patterns: [
        {from: 'src/img', to: 'img'},
        {from: 'src/style', to: 'style'},
        {from: 'src/manifest.json', to: 'manifest.json', toType:'file'},
        { from: 'src/sidebar.html', to: 'sidebar.html', toType:'file'},
        { from: 'src/index.html', to: 'index.html', toType:'file'},
      ]
    })
  ]
};

export default config;