const path = require('path');

module.exports = {
  publicPath: '/bee/ppp',
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
  outputDir: path.join(__dirname, '../public'),
};
