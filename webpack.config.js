const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => ({
  mode: argv.mode,
  cache: false,
  watch: argv.mode === "development",
  watchOptions: {
    aggregateTimeout: 5000,
    ignored: ["node_modules"]
  },
  devtool: argv.mode === "production" ? "source-map" : "cheap-module-eval-source-map",
  performance: { hints: 'warning' },
  optimization: {
    minimize: argv.mode === "production",
    nodeEnv: argv.mode
  },
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", ".scss"],
    alias: {
      "@components": path.resolve(__dirname, "./src/js/components"),
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "manifest.json"),
        to: path.join(__dirname, "build"),
        transform: function(content) {
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
    new webpack.EnvironmentPlugin({
      "process.env.NODE_ENV": JSON.stringify(argv.mode),
      "homepage_url": process.env.npm_package_homepage
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "hot-reload.js"),
        to: path.join(__dirname, "build")
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "html", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    })
  ]
});
