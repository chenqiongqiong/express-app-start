module.exports = {
  publicPath: '/bee/portal',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/api'
        // }
      }
    }
  },
  outputDir: '../public'
}