/*
  初始化init -> 构建module -> 生成chunk -> 渲染assets
  entryOption -> run -> compile -> compilation -> make -> seal -> emit -> done
*/ 

// code spliting
// 多入口entry[] 会有重复代码会被各自打包的问题 dependOn 
// 插件splitChunksPlugin 
// 动态引入import()
// runtime

// complier | the fully configured Webpack environment | just build once 
// compilation | a single build of versioned assets | build each time a file changed | conenthash

/*
  动态添加入口
*/ 
const EntryOptionPlugin = require('webpack/lib/EntryOptionPlugin')
// const EntryPlugin = require('webpack/lib/EntryPlugin')
// const DynamicPlugin = require('webpack/lib/DynamicEntryPlugin')
const path = require('path')
const {resolve} = path
const fs = require('fs')
const replaceExt = require('replace-ext')
const ensurePosixPath = require('ensure-posix-path')
const assetsChunkName = 'assetsChunkName'
const WXDYNAMICENTRY = 'WxDynamicEntry'

class WxDynamicEntry{
  apply(compiler){
    const isProductionMode = compiler.options.mode === 'production' 
    const hookName = isProductionMode ? 'entryOption' : 'watchRun'
    // hooks
    compiler.hooks[hookName].tap(WXDYNAMICENTRY, _ => {
      const {context, entry } = compiler.options
      EntryOptionPlugin.applyEntryOption(
        compiler,
        context,
        getEntries(context, entry)
      )
    })
  }
}

function getEntries(context, entry){
  return _ => {
    const entries = Object.assign(entry)
    const props = ['pages', 'subPackages', 'usingComponents']
    const appJson = JSON.parse(fs.readFileSync(resolve(context, './app.json'), 'utf-8'))
    props.forEach((prop) => {
      const item = appJson[prop]
      if(typeof item != 'object') return
      Object.values(item).forEach((_path) => {
        // 子包拼接路径root
        if (prop == 'subPackages') {
          Object.values(_path.pages).forEach(($path) => {
            const finalPath = _path.root + $path
            if (entries[finalPath]) return
            entries[finalPath] = { import: ['./' + finalPath] }
          })
        } else {
          if(entries[_path]) return
          entries[_path] = {import: ['./' + _path]}
        }
      })
    })
    entries[assetsChunkName] = {
      import: [...Object.values(entries)].map((entry) => ensurePosixPath(replaceExt(entry.import[0], '.scss')))
    }
    return entries
  }
}

module.exports = WxDynamicEntry