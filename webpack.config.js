const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => ({
  mode: argv.mode,
  cache: false,
  watch: argv.mode === "development",
  watchOptions: {
    aggregateTimeout: 2000,
    ignored: ["node_modules"]
  },
  devtool: argv.mode === "production" ? "source-map" : "cheap-module-eval-source-map",
  optimization: {
    minimize: argv.mode === "production",
    nodeEnv: argv.mode
  },
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    popupcss: path.join(__dirname, "src", "scss", "popup.scss"),
    background: path.join(__dirname, "src", "js", "background.js"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              ['@babel/plugin-transform-runtime'],
              ["babel-plugin-styled-components", {
                "ssr": false,
                "displayName": argv.mode === "development"
              }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              ["@babel/plugin-syntax-dynamic-import"]
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", ".scss"],
    alias: {
      "@components": path.resolve(__dirname, "./src/js/components"),
      "@containers": path.resolve(__dirname, "./src/js/containers"),
      "@stores": path.resolve(__dirname, "./src/js/store"),
      "@shared": path.resolve(__dirname, "./src/js/shared"),
      "@utils": path.resolve(__dirname, "./src/js/utils"),
      "@img": path.resolve(__dirname, "./src/img"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "manifest.json"),
        to: path.join(__dirname, "build"),
        transform: function (content) {
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            })
          );
        }
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "src", "img"),
        to: path.join(__dirname, "build", "images")
      }
    ]),
    new webpack.EnvironmentPlugin({
      "homepage_url": process.env.npm_package_homepage
    }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      theme: 'light',
      template: path.join(__dirname, "src", "html", "popup.html"),
      filename: "popup-light.html",
      chunks: ["popup", "popupcss"]
    }),
    new HtmlWebpackPlugin({
      theme: 'dark',
      template: path.join(__dirname, "src", "html", "popup.html"),
      filename: "popup-dark.html",
      chunks: ["popup", "popupcss"]
    }),
  ]
});
