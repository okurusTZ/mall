import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 利用vue实例来当做事件总线
Vue.prototype.$bus = new Vue({})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')