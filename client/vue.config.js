module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
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
