const glob = require('glob')
const path = require('path')
const {resolve} = path
const fs = require('fs')
const replaceExt = require('replace-ext')
const ensurePosixPath = require('ensure-posix-path')
const assetsChunkName = 'assetsChunkName'

// const files = glob.sync('src/**/*.js').reduce((prev, path) => {
//   prev[path] = path
//   return prev
// }, {});

function getEntries(context, entry){
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
            entries[finalPath] = './' + finalPath
          })
        } else {
          if(entries[_path]) return
          entries[_path] = './' + _path
        }
      })
    })
    entries[assetsChunkName] = 
        [...Object.values(entries)].map((entry) => 
            ensurePosixPath(replaceExt(entry, '.scss')))
    return entries
}

module.exports = getEntries