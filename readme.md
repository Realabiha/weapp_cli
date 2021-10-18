# npm scripts
- npm run dev development打包
- npm run build production打包
- npm run debug debug调试

# why use webpack
- 更好的npm使用体验
- 可使用sass等预处理器
- 可使用babel转换es6+
- 多环境支持
- 维护更方便
- ...

# webpack
## module chunk bundle
- 源代码中的各种js/css/jpg模块文件
- 从入口开始依赖收集完成后生成的文件
- 打包最终输出的文件
## filename chunkFilename
- 入口打包出来的文件名
- 异步动态加载的文件名
## id hash chunkhash contenthash
- hash 整个项目是否改变
- chunkhash 一个入口对应chunk文件是否改变
- contenhash 一个模块的对应module文件是否改变

## 分析构建性能
- webpack-bundle-analyzer
- speed-measure-webpack-plugin
## 提高构建性能([https://webpack.docschina.org/guides/build-performance/])
- cache
- devtool
- DLL
- cache-loader
- thread-loader
- loader include/exclude
- ...

# tree shaking

# code spliting
- 多入口
- splitChunks
- import()
- runtime

# babel([https://juejin.cn/post/6844903858632654856#heading-4])
## plugins
## presets

# Commonjs & ESM([https://mp.weixin.qq.com/s/6VncXyYo_UKxymvsUJyY5w])
## cjs 执行阶段依赖分析
```javascript 
function wrapper(code){
  return `(function(exports, module, require, __filename, __dirname){
    ${code}
  \n})`
}
```
## cjs require加载(同步)
- 核心模块 参数是否为fs/path/http等node标识符
- 文件模块 参数是否为`./`或`../`相对路径标识符以及`/`绝对路径标识符
- npm模块  参数是自定义非核心模块和文件模块(当前目录下nod_modules/)
```javascript
function require(id){
  // 有当前module缓存直接返回
  const cachedModule = Module[id]
  if(cachedModule){
    return cachedModule
  }
  // 没有则创建当前module
  const module = {exports: {}, loaded: false, ...}
  // 缓存结果(*先缓存*)
  cachedModule[id] = module
  // 加载文件(*后执行你写的代码*)
  eval(wrapper('你写的代码')(module.exports, module, require, __filename, __dirname))
  // 加载完成
  module.loaded = true
  // 返回导出内容(基本类型导出值，引用类型导出地址)
  return module.exorts
}
```
## esm
- esm依赖分析发生在编译时是静态的
- esm自动严格模式
- esm提前加载并执行模块文件
- 导出的内容是动态绑定的(可以理解为导出的都是引用地址)且不能直接修改
- import()可以作为函数动态导入模块返回值是一个promise
- 以上特性适合tree shaking 和 code spliting
```javascript
// a.js
export let num = 1
export function numPlus(){
  return num++
}
// index.js
import {num, numPlus} from './a.js'
num += 1 // error read-only
numPlus() // num = 2
```

## 异步加载([https://pic3.zhimg.com/v2-8e79cd0f8ad4f3087667c69aedf47512_r.jpg])