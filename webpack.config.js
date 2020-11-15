const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

if (!process.env.TARGET) {
  throw new Error("Please specify env TARGET, 'chrome' or 'firefox'.")
} else {
  console.info(`\x1b[1;32mBuilding for target ${process.env.TARGET}...\x1b[m`)
}

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development'
  return {
    entry: {
      main: path.resolve(__dirname, './src/js/index.js')
    },
    watch: IS_DEV,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devtool: IS_DEV ? 'eval-cheap-module-source-map' : 'none',
    plugins: [
      IS_DEV
        ? new CopyWebpackPlugin({
            patterns: [
              {
                from: path.join(__dirname, 'utils', 'chrome-hot-reload.js'),
                to: path.join(__dirname, 'dist')
              }
            ]
          })
        : null,
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'webpack Boilerplate',
        template: path.resolve(__dirname, './src/html/popup.html'),
        filename: 'popup.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'manifest.json'),
            to: path.join(__dirname, 'dist'),
            force: true,
            transform: function (content) {
              const manifestContent = JSON.parse(content.toString())
              if (process.env.TARGET === 'chrome') {
                delete manifestContent['browser_specific_settings']
              }
              if (IS_DEV) {
                manifestContent['content_security_policy'] =
                  "script-src 'self' 'unsafe-eval'; object-src 'self'"
                manifestContent['permissions'].push('http://localhost:3000/*')
              }
              return Buffer.from(
                JSON.stringify({
                  description: process.env.npm_package_description,
                  version: process.env.npm_package_version,
                  ...manifestContent
                })
              )
            }
          }
        ]
      })
    ]
  }
}
