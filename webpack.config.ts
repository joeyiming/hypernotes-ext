import path from "path";
import { Configuration } from "webpack";
const config: Configuration = {
  entry: "./src/index.ts",
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
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "extension.bundle.js",
  }
};

export default config;