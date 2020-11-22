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

const outputPath = path.join(__dirname, 'dist', process.env.TARGET)

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development'
  const config = {
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
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    output: {
      path: outputPath,
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@components': path.resolve(__dirname, './src/js/components'),
        '@containers': path.resolve(__dirname, './src/js/containers'),
        '@styled': path.resolve(__dirname, './src/js/styled'),
        '@stores': path.resolve(__dirname, './src/js/stores'),
        '@shared': path.resolve(__dirname, './src/js/shared'),
        '@utils': path.resolve(__dirname, './src/js/utils'),
        '@img': path.resolve(__dirname, './src/img'),
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        title: 'webpack Boilerplate',
        template: path.resolve(__dirname, './src/html/popup.html'),
        filename: 'popup.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'manifest.json'),
            to: outputPath,
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
                JSON.stringify(
                  {
                    description: process.env.npm_package_description,
                    version: process.env.npm_package_version,
                    ...manifestContent
                  },
                  null,
                  4
                )
              )
            }
          },
          {
            from: path.join(__dirname, 'icons'),
            to: path.join(outputPath, 'icons')
          }
        ]
      })
    ]
  }

  if (IS_DEV) {
    config.devtool = 'cheap-module-source-map'
  } else {
    config.plugins.push(new CleanWebpackPlugin())
  }

  return config
}
