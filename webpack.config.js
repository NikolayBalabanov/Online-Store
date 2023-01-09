const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env) => ({
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/',
        assetModuleFilename: 'assets/img/[name][ext]',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        { 
            test: /\.ts$/i, 
            loader: 'ts-loader', 
            exclude: /node_modules/ 
        },
        { 
            test: /\.js$/, 
            loader: 'source-map-loader' 
        }, 
        {
          test: /\.css$/i,
          use: [
            env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.scss$/i,
          use: [
            env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/inline',
        },
      ],
    },
    optimization: {
      minimizer: [
        '...',
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                              params: {
                                attributes: [
                                  { xmlns: 'http://www.w3.org/2000/svg' },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
    },
    devtool: 'inline-source-map',
    devServer: {
      static: path.resolve(__dirname, '../dist'),
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Online-Store',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'main.[contenthash].css',
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'src', 'assets'),
                to: path.resolve(__dirname, '../dist', 'assets'),
            },
        ],
      }),
    ],
  })
