/*
  剔除 所有scss文件入口打包后对应的chunk文件
*/ 

const WXRUNTIMECHUNK = 'WxRuntimeChunk'
class WxRuntimeChunk{
  apply(compiler){
    compiler.hooks.compilation.tap(WXRUNTIMECHUNK, (compilation) => {
      compilation.hooks.beforeChunkAssets.tap(WXRUNTIMECHUNK, _ => {
        const {chunks} = compilation
        const assetsChunk = [...chunks].find(chunk => chunk.name === 'assetsChunkName')
        assetsChunk && chunks.delete(assetsChunk)
      })
    })
    compiler.hooks.done.tap(WXRUNTIMECHUNK, stats => {
      
    })
  }
}
module.exports = WxRuntimeChunk