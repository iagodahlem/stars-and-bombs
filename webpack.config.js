const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractCssPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssPlugin.loader,
          'css-loader'
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new ExtractCssPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
