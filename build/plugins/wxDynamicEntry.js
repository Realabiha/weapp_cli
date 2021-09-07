// 初始化init -> 构建module -> 生成chunk -> 渲染assets

// code spliting
// 多入口entry[] 会有重复代码会被各自打包的问题 dependOn 
// 插件splitChunksPlugin 
// 动态引入import()

// complier | the fully configured Webpack environment | just build once 
// compilation | a single build of versioned assets | build each time a file changed | conenthash


const EntryOptionPlugin = require('webpack/lib/EntryOptionPlugin')
const path = require('path')
const {resolve} = path
const fs = require('fs')
const replaceExt = require('replace-ext')
const ensurePosixPath = require('ensure-posix-path')
const assetsChunkName = 'assetsChunkName'
const WXDYNAMICENTRY = 'WxDynamicEntry'
class WxDynamicEntry{
  apply(compiler){
    compiler.hooks.entryOption.tap(WXDYNAMICENTRY, (context, entry) => {
      try {
        const entries = getEntries(context, entry)
			  EntryOptionPlugin.applyEntryOption(compiler, context, entries)
      } catch (error) {
      }
    })
  }
}
function getEntries(context, initialEntry){
    const entry = Object.assign(initialEntry)
    const props = ['pages', 'subPackages', 'usingComponents']
    const appJson = JSON.parse(fs.readFileSync(resolve(context, './app.json'), 'utf-8'))
    props.forEach((prop) => {
      const item = appJson[prop]
      if (typeof item == 'object') {
        Object.values(item).forEach((_path) => {
          if (_path.root) {
            Object.values(_path.pages).forEach((_p) => {
              entry[_path.root + _p] = {import: ['./' + _path.root + _p]}
            })
          } else {
            entry[_path] = {import: ['./' + _path]}
          }
        })
      }
    })
    entry[assetsChunkName] = {
      import: Object.values(entry).slice(0).map((entry) => ensurePosixPath(replaceExt(entry.import[0], '.scss')))
    }
    return entry
}

module.exports = WxDynamicEntry