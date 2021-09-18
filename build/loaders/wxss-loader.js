const options = require('loader-utils')
console.log(options)
module.exports = function(source){
  console.log(source, 'source===')
  return source
}