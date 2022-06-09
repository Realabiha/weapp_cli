/*
  剔除 所有scss文件入口打包后对应的chunk文件
*/
const path = require('path')
const webpack = require('webpack')
const { ConcatSource } = require('webpack-sources')
const ensurePosix = require('ensure-posix-path')
const requiredPath = require('required-path')
const WXRUNTIMECHUNK = 'WxRuntimeChunk'
class WxRuntimeChunk {
  apply(compiler) {
    compiler.hooks.compilation.tap(WXRUNTIMECHUNK, (compilation) => {
      compilation.hooks.beforeChunkAssets.tap(WXRUNTIMECHUNK, (_) => {
        const { chunks, mainTemplate, chunkTemplate } = compilation
        const assetsChunk = [...chunks].find(
          (chunk) => chunk.name === 'assetsChunkName'
        )
        assetsChunk && chunks.delete(assetsChunk)

        // if(compiler.options.target == 'node') return

        // for(let template of [mainTemplate, chunkTemplate]){
        //   template.hooks.renderWithEntry.tap(WXRUNTIMECHUNK, (source, entry) => {
        //     // 非动态入口
        //     if(!entry.hasEntryModule()) return source;
        //     // 收集动态入口所有的依赖
        //     let dependences = [];
        //     entry.groupsIterable.forEach(group => {
        //       group.chunks.forEach(chunk => {
        //         const filename = ensurePosix(path.relative(path.dirname(entry.name), chunk.name))
        //         if(chunk === entry || dependences.includes(filename)) return;
        //         dependences.push(filename)
        //       })
        //     })
        //     // 没有依赖
        //     if (dependences.length == 0) return
        //     // 源文件拼接依赖
        //     const concatStr = dependences.reduce((prev, file) => {
        //       prev += `require('${requiredPath(file)}');`
        //       return prev
        //     }, ';')
        //     return  new ConcatSource(concatStr, source)
        //   })
        // }

        webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(
          compilation
        ).render.tap(WXRUNTIMECHUNK, (source, context) => {
          // 非入口模块 或 包含runtime
          if (
            context.chunkGraph.getNumberOfEntryModules(context.chunk) === 0 ||
            context.chunk.hasRuntime()
          ) {
            return source
          }

          // 收集动态入口所有的依赖
          const dependences = new Set()
          context.chunk.groupsIterable.forEach((group) => {
            group.chunks.forEach((chunk) => {
              const filename = ensurePosix(
                path.relative(path.dirname(context.chunk.name), chunk.name)
              )
              if (chunk === context.chunk) return
              dependences.add(filename)
            })

          })

          // 没有依赖
          if (dependences.size == 0) return
          // 源文件拼接依赖
          let concatStr = ';'
          dependences.forEach((file) => {
            concatStr += `require('${requiredPath(file)}');`
          })
          return new ConcatSource(concatStr, source)
        })
      })

      // compilation.hooks.optimizeChunkAssets.tapAsync(WXRUNTIMECHUNK, (chunks, callback) => {
      //   chunks.forEach(chunk => {
      //     chunk.files.forEach(file => {
      //       compilation.assets[file] = new ConcatSource('/**abiha test**/', '\n', compilation.assets[file])
      //     })
      //   })
      //   callback()
      // })
    })
    compiler.hooks.done.tap(WXRUNTIMECHUNK, (stats) => {})
  }
}
module.exports = WxRuntimeChunk
