module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '^/api|^/static': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}