const path = require('path')
const {resolve} = path
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WxRuntimeChunk = require('./build/plugins/wxRuntimeChunk')
const WxDynamicEntry = require('./build/plugins/wxDynamicEntry')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const SRCDIR = resolve(__dirname, 'src') 
const smp = new SpeedMeasurePlugin()
const plugins = [
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: '**/*',
        to: '',
        globOptions: {
          ignore: ['**/*.js', '**/*.scss'],
        },
      },
    ],
  }),
  new WxDynamicEntry(),
  new WxRuntimeChunk(),
]
const webpackCommonConfig = {
  context: SRCDIR,
  mode: 'none',
  target: 'node',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 1000,
  },
  entry: { app: './app.js' },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: 'wx',
    clean: true,
  },
  resolve: {
    alias: {
      '@': SRCDIR,
    },
    extensions: ['.js', '.json'],
  },
  resolveLoader: {
    modules: ['node_modules', 'build/loaders'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s(a|c)ss$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].wxss',
              context: resolve('src'),
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins,
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      name: 'common',
      cacheGroups: {
        lottie: {
          name: 'lottie',
          test: /[\\/]lottie-miniprogram[\\/]/,
          priority: 0,
        },
        animationJson: {
          name: 'animationJson',
          test: /json/,
          priority: 0,
        },
      },
    },
    moduleIds: 'named'
  },
}

module.exports = smp.wrap(webpackCommonConfig)