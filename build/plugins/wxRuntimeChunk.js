const path = require("path")
const requiredPath = require("required-path")
const ensurePosixPath = require("ensure-posix-path")
const {ConcatSource} = require("webpack-sources")
const JavascriptModulesPlugin = require('webpack/lib/javascript/JavascriptModulesPlugin')
const WXRUNTIMECHUNK = 'WxRuntimeChunk'
class WxRuntimeChunk{
  apply(compiler){
    compiler.hooks.watchRun.tap(WXRUNTIMECHUNK, compiler => {
    })
    compiler.hooks.compilation.tap(WXRUNTIMECHUNK, (compilation) => {
      // JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(WXRUNTIMECHUNK,(source, {chunk})=>{
        // console.log(Object.keys(chunk))
      // })
      // for (let template of [compilation.mainTemplate, compilation.chunkTemplate]) {
      //   template.hooks.renderWithEntry.tap(WXRUNTIMECHUNK, (source, entry) => {
      //     if (!isRuntimeExtracted(compilation)) {
      //       return source
      //     }
      //     if (!entry.hasEntryModule()) {
      //       return source
      //     }
      //     // 收集依赖
      //     let dependences = []
      //     entry.groupsIterable.forEach((group) => {
      //       group.chunks.forEach((chunk) => {
      //         const filename = ensurePosixPath(path.relative(path.dirname(entry.name), chunk.name))
      //         if (chunk === entry || ~dependences.indexOf(filename)) {
      //           return
      //         }
      //         dependences.push(filename)
      //       })
      //     })
      //     return new ConcatSource(script({ dependences }), source)
      //   })
      // }
      compilation.hooks.beforeChunkAssets.tap(WXRUNTIMECHUNK, (source, entry) =>{
        const {chunks} = compilation
        const assetsChunk = [...chunks].find(chunk => chunk.name === 'assetsChunkName')
        assetsChunk && chunks.delete(assetsChunk)
      })
    })
  }
}

function isRuntimeExtracted(compilation){
  // compilation.chunks set
  return [...compilation.chunks].some(chunk => chunk.isOnlyInitial() && chunk.hasRuntime() && !chunk.hasEntryModule())
}

function script({dependences}){
  return ';' + dependences.map(dependence => `require('${requiredPath(dependence)}');`).join('')
}

module.exports = WxRuntimeChunk