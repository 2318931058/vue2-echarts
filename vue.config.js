const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    performance: { // 关闭性能提示
      hints: false
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all'
      }
    }
  }
})
