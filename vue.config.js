module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // router和store不需要配置
        // 可直接通过$route/$store获取
        'assets': '@/assets',
        'common': '@/common',
        'components': '@components',
        'network': '@network',
        'views': '@/views'
      }
    }
  }
}
