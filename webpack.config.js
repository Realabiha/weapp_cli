const path = require('path')
const {resolve} = path
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WxRuntimeChunk = require('./build/plugins/wxRuntimeChunk')
const WxDynamicEntry = require('./build/plugins/wxDynamicEntry')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const ISPROD = process.env.NODE_ENV === 'production'
const SRCDIR = resolve(__dirname, 'src') 
const SMP = new SpeedMeasurePlugin()
const plugins = [
  new CleanWebpackPlugin(),
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
  // target=web
  new WxRuntimeChunk(),
  // new CompressionPlugin(),
]
// 配置TerserPlugin剔除console及debug
// const minimizer = [
//   new TerserPlugin({
//     terserOptions: {
//       compress: {
//         drop_debugger: true,
//         drop_console: true,
//       },
//     },
//   }),
// ]
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
    chunkFilename: ISPROD ?'async_[contenthash:5].js' : 'async_[name].js',
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
        test: /\.wxml$/,
        include: /src/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].wxml',
            context: resolve('src')
          }
        }
      },
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
    moduleIds: ISPROD ? 'deterministic' : 'named',
  },
  devtool: ISPROD ? false : 'source-map',
  cache: {
    type: 'filesystem'
  }
}

// 生产环境剔除console及debug
// ISPROD && (config.optimization.minimizer = minimizer)

// 构建性能
// dll thread-loader cache-loader cache

// module.exports = ISPROD ? config : SMP.wrap(config)
module.exports = config