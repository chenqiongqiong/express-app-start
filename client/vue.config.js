module.exports = {
  publicPath: './',
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
  outputDir: './dist',
  productionSourceMap: false,
};
