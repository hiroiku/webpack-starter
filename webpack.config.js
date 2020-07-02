const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: './src/bootstrap.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name]-[chunkhash].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  devServer: {
    quiet: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: './assets/images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new StylelintWebpackPlugin({
      files: ['./src/**/*.{htm,html,css,sss,less,scss,sass}'],
    }),
    new MiniCssExtractPlugin({
      filename: './assets/css/[name]-[chunkhash].css',
    }),
    new ImageminWebpackPlugin({
      disable: process.env.NODE_ENV !== 'production',
      gifsicle: { optimizationLevel: 2, interlaced: false },
      pngquant: { quality: 80 },
      svgo: {
        plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
      },
      webp: { quality: 80 },
      plugins: [imageminMozjpeg({ progressive: true, quality: 80 })],
    }),
  ],
};
