const babelParser = require('@babel/parser')
const babelTraverse = require('@babel/traverse')
const babelGenerator = require('@babel/generator')
const babelTypes = require('@babel/types')
const loaderUtils = require('loader-utils')
module.exports = function(source){
  // console.log(loaderUtils.getOptions(this), 'options')
  /*
    {
      type: ...
      body: ...
      id: ...
      params: ...
    }
  */ 
  const ast = babelParser.parse(source, {sourceType: 'module'})
  const vistor = {
    // 监听 debugger语句
    DebuggerStatement(path){
      path.remove()
    },
    // 监听 函数执行表达式
    CallExpression(path){
      babelTypes.isMemberExpression(path.node.callee) && 
      babelTypes.isIdentifier(path.node.callee.object, {name: 'console'}) &&
      path.remove()
    }
  }
  babelTraverse.default(ast, vistor)
  const {code} = babelGenerator.default(ast, {}, source)
  return code
}