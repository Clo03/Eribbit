// Node.js内置的path
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 需要自动引入的文件（绝对路径）
      // path.join拼接完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variable.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  }
})
