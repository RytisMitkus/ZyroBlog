// const path = require('path')

module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, '/'),
    // host: 'localhost',
    // port: 8080,
    // proxy: {
    //   '/': {
    //     target: 'http://127.0.0.1:3000',
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
      },
    },
    progress: false,
  },
}
