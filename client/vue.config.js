module.exports = {
  publicPath: '/bee/portal/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/api'
        // }
      },
    },
  },
  outputDir: '../server/static',
  productionSourceMap: false,
};
