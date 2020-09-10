const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    open: true,
  },

  devtool: 'cheap-source-map',
  entry: './src/index.tsx',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },

        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },

  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          flatten: true,
          from: './src/images/*',
          to: 'images/',
        },
        {
          flatten: true,
          from: './src/manifest.json',
          to: './',
        },
        {
          flatten: true,
          from: './src/robots.txt',
          to: './',
        },
      ],
    }),

    new HtmlWebpackPlugin({
      minify: true,
      template: './src/index.html',
    }),

    new InjectManifest({
      swSrc: './src/service-worker.js',
    }),
  ],

  stats: {
    builtAt: false,
    entrypoints: false,
    excludeAssets: [/images[/\\]/, /precache-manifest\./, /robots\.txt/],
    hash: false,
    modules: false,
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
