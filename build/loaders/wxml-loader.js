const path = require('path')
const utils = require('loader-utils')
// console.dir(utils, 'utils')
let htmlparser = require('htmlparser');
module.exports = function(source){
  let result = []
  let handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error){
      throw new Error('wxml parse error :(')
    }else{
      const getSrcValue = function({attribs, children}, result = []){
        const value = attribs&&attribs.src
        if(value && !value.includes('{')){
          // const request = utils.urlToRequest(value)
          // console.log(request, 'request============')
          result.push(value)
        }
        if(children && children.length){
          children.forEach(child => {
            getSrcValue(child, result)
          })
        }
        return result
      }
      result = dom.reduce((prev, node) => {
        return prev.concat(getSrcValue(node))
      }, [])
    }
  });
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(source);
  // console.log(result, 'result====')
  return `module.exports = ${JSON.stringify(result)}` 
}