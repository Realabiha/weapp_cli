module.exports = {
  // Error: ES Modules may not assign module.exports or exports.*, Use ESM export syntax
  sourceType: "unambiguous",
  plugins: [
    "@babel/plugin-transform-runtime"
  ],
  presets: [
    [
      // **语法**转换
      "@babel/preset-env",
      {
        // 按需引入pollfill抹平浏览器**API**差异
        useBuiltIns: "usage",
        // pollfill核心依赖库core-js
        corejs: 3
      }
    ]
  ]
}