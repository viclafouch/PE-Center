const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

if (!process.env.TARGET) {
  throw Error("Please specify env var TARGET, 'chrome' or 'firefox'.")
} else if (!(process.env.TARGET === 'chrome' || process.env.TARGET === 'firefox')) {
  throw Error("TARGET can only be 'chrome' or 'firefox'.")
} else {
  console.info(`\x1b[1;32mBuilding for target ${process.env.TARGET}...\x1b[m`)
}

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
      "@styled": path.resolve(__dirname, "./src/js/styled"),
      "@stores": path.resolve(__dirname, "./src/js/store"),
      "@shared": path.resolve(__dirname, "./src/js/shared"),
      "@utils": path.resolve(__dirname, "./src/js/utils"),
      "@img": path.resolve(__dirname, "./src/img"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  output: {
    path: path.join(__dirname, "build", process.env.TARGET),
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
        to: path.join(__dirname, "build", process.env.TARGET),
        transform: function (content) {
          const manifestContent = JSON.parse(content.toString())
          if (process.env.TARGET === 'chrome') {
            delete manifestContent["browser_specific_settings"]
          }
          if (argv.mode !== "production") {
            manifestContent["permissions"].push('http://localhost:3000/*')
          }
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...manifestContent
            })
          );
        }
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "src", "img"),
        to: path.join(__dirname, "build", process.env.TARGET, "images")
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "icons"),
        to: path.join(__dirname, "build", process.env.TARGET, "icons")
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
