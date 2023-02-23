const path = require('path')
const { resolve } = path
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WxRuntimeChunk = require('./build/plugins/wxRuntimeChunk')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const ISPROD = process.env.NODE_ENV === 'production'
const SRCDIR = resolve(__dirname, 'src')
const SMP = new SpeedMeasurePlugin()
const plugins = [
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
  new WxRuntimeChunk(),
]

const config = {
  context: SRCDIR,
  mode: ISPROD ? 'production' : 'development',
  // target: 'node',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['**/node_modules', '**/json'],
    poll: 1000,
  },
  entry: { app: './app.js' },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: ISPROD ? '[contenthash:5].js' : '[name].js',
    chunkFilename: ISPROD ? 'async_[contenthash:5].js' : 'async_[name].js',
    globalObject: 'wx',
    clean: true,
    publicPath: '',
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
        use: 'babel-loader'
      },
      {
        test: /\.s(a|c)ss$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].wxss',
              context: resolve('src')
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|webp|gif)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name].[ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      }
    ],
  },
  plugins,
  optimization: {
    // tree shaking
    usedExports: true,
    // runtime code
    runtimeChunk: {
      name: 'runtime',
    },
    // code splitting
    splitChunks: {
      chunks: 'all',
      name: 'common',
      // code cache
      cacheGroups: {
        lottie: {
          name: 'lottie',
          test: /[\\/]lottie-miniprogram[\\/]/,
          priority: 0,
        },
      },
    },
    // moduleIds: ISPROD ? 'deterministic' : 'named',
  },
  // devtool: 'cheap-source-map',
  devtool: false,
  cache: {
    type: 'filesystem'
  }
}

// 生产环境剔除console及debug
// ISPROD && (config.optimization.minimizer = minimizer)

// 构建性能
// dll thread-loader cache-loader cache

// module.exports = ISPROD ? config : SMP.wrap(config)
config.entry = require('./build/utils/getEntries')(SRCDIR, config.entry)
module.exports = config