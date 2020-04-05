module.exports = {
  publicPath:'./',
  lintOnSave:'warning',
  runtimeCompiler: true,
  css: { extract: false },
  chainWebpack(config) {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: Infinity }))
  },
}
