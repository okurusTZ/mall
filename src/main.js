import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import Toast from './components/common/toast'

Vue.config.productionTip = false

// 利用vue实例来当做事件总线
Vue.prototype.$bus = new Vue({})

// 安装Toast插件
Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')